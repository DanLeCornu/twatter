import { Arg, Args, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"

import { FindManyMessageArgs } from "@twatter/database/dist/generated"

import { prisma } from "../../lib/prisma"
import { CurrentUser } from "../shared/currentUser"
import { UseAuth } from "../shared/middleware/UseAuth"
import { User } from "../user/user.model"
import { CreateMessageInput } from "./inputs/createMessage.input"
import { Message } from "./message.model"
import { Conversation, ConversationsResponse } from "./responses/conversations.response"
import { MessagesResponse } from "./responses/messages.response"

@Service()
@Resolver(() => Message)
export default class MessageResolver {
  // MY MESSAGES
  @Query(() => MessagesResponse)
  async myMessages(
    @CurrentUser() currentUser: User,
    @Args() args: FindManyMessageArgs,
  ): Promise<MessagesResponse> {
    const items = await prisma.message.findMany({
      ...(args as any),
      where: {
        ...args.where,
        archivedAt: null,
      },
    })
    const count = await prisma.message.count({
      ...(args as any),
      where: { ...args.where, archivedAt: null },
      take: undefined,
      skip: undefined,
    })
    return { items, count }
  }

  // MY CONVERSATIONS
  @Query(() => ConversationsResponse)
  async myConversations(@CurrentUser() currentUser: User): Promise<ConversationsResponse> {
    // TODO: filter out archived messages
    const items: Conversation[] = await prisma.$queryRaw`
      WITH UserConversations AS (
        SELECT
          CASE
            WHEN "senderId" = ${currentUser.id}::uuid THEN "receiverId"
            WHEN "receiverId" = ${currentUser.id}::uuid THEN "senderId"
          END AS id,
          id as "messageId",
          "senderId",
          "receiverId",
          text,
          "Message"."createdAt"
        FROM "Message"
        WHERE "senderId" = ${currentUser.id}::uuid OR "receiverId" = ${currentUser.id}::uuid
      )
      SELECT
        uc.id,
        JSON_BUILD_OBJECT(
          'id', "User".id,
          'name', "User".name,
          'handle', "User".handle,
          'avatar', "User".avatar
        ) AS user,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', uc."messageId",
            'senderId', "senderId",
            'receiverId', "receiverId",
            'text', text,
            'createdAt', uc."createdAt"
          ) ORDER BY uc."createdAt"
        ) AS messages
      FROM UserConversations uc
        JOIN "User" ON uc.id = "User".id
      GROUP BY uc.id, "User".id
      ORDER BY MAX(uc."createdAt") DESC
    `
    // console.dir(items, { depth: null })
    return { items, count: items.length }
  }

  // CREATE MESSAGE
  @UseAuth()
  @Mutation(() => Boolean)
  async createMessage(
    @CurrentUser() currentUser: User,
    @Arg("data") data: CreateMessageInput,
  ): Promise<Boolean> {
    await prisma.message.create({ data: { senderId: currentUser.id, ...data } })
    return true
  }
}
