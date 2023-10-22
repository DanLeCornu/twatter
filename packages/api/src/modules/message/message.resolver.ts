import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"

import { prisma } from "../../lib/prisma"
import { CurrentUser } from "../shared/currentUser"
import { UseAuth } from "../shared/middleware/UseAuth"
import { User } from "../user/user.model"
import { CreateMessageInput } from "./inputs/createMessage.input"
import { Message } from "./message.model"
import { Conversation, ConversationsResponse } from "./responses/conversations.response"

@Service()
@Resolver(() => Message)
export default class MessageResolver {
  // // MY MESSAGES
  // @Query(() => MessagesResponse)
  // async myMessages(
  //   @CurrentUser() currentUser: User,
  //   @Args() args: FindManyMessageArgs,
  // ): Promise<MessagesResponse> {
  //   const items = await prisma.message.findMany({
  //     ...(args as any),
  //     where: {
  //       ...args.where,
  //       archivedAt: null,
  //       OR: [{ senderId: currentUser.id }, { receiverId: currentUser.id }],
  //     },
  //   })
  //   const count = await prisma.message.count({
  //     ...(args as any),
  //     where: { ...args.where, archivedAt: null },
  //     take: undefined,
  //     skip: undefined,
  //   })
  //   return { items, count }
  // }

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
          END AS "conversationId",
          id,
          "senderId",
          "receiverId",
          text,
          "createdAt"
        FROM "Message"
        WHERE "senderId" = ${currentUser.id}::uuid OR "receiverId" = ${currentUser.id}::uuid
      )
      SELECT
      "conversationId",
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', id,
            'senderId', "senderId",
            'receiverId', "receiverId",
            'text', text,
            'createdAt', "createdAt"
          ) ORDER BY "createdAt"
        ) AS messages
      FROM UserConversations
      GROUP BY "conversationId"
      ORDER BY MAX("createdAt") DESC
    `
    console.dir(items, { depth: null })
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
