import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"

import { MessageOrderByWithRelationInput, NotificationType } from "@twatter/database/dist/generated"

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
  // GET MESSAGE
  @Query(() => Message, { nullable: true })
  async message(
    @CurrentUser() currentUser: User,
    @Arg("messageId") messageId: string,
  ): Promise<Message | null> {
    const where = {
      OR: [{ senderId: { equals: currentUser.id } }, { receiverId: { equals: currentUser.id } }],
    }
    return await prisma.message.findFirst({
      where: {
        id: messageId,
        ...where,
      },
    })
  }

  // MY MESSAGES
  @Query(() => MessagesResponse)
  async myMessages(
    @CurrentUser() currentUser: User,
    @Arg("userId") userId: string,
    @Arg("orderBy", () => [MessageOrderByWithRelationInput]) orderBy: MessageOrderByWithRelationInput[],
  ): Promise<MessagesResponse> {
    const where = {
      OR: [
        { AND: [{ senderId: { equals: currentUser.id } }, { receiverId: { equals: userId } }] },
        { AND: [{ senderId: { equals: userId } }, { receiverId: { equals: currentUser.id } }] },
      ],
    }
    const notArchivedByMe = {
      AND: [
        { OR: [{ archivedByAId: { not: { equals: currentUser.id } } }, { archivedByAId: { equals: null } }] },
        { OR: [{ archivedByBId: { not: { equals: currentUser.id } } }, { archivedByBId: { equals: null } }] },
      ],
    }
    const items = await prisma.message.findMany({
      where: {
        ...where,
        ...notArchivedByMe,
      },
      orderBy,
    })
    const count = await prisma.message.count({
      where: {
        ...where,
        ...notArchivedByMe,
      },
      take: undefined,
      skip: undefined,
    })
    return { items, count }
  }

  // MY CONVERSATIONS
  @Query(() => ConversationsResponse)
  async myConversations(@CurrentUser() currentUser: User): Promise<ConversationsResponse> {
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
          "Message"."createdAt",
          "archivedByAId",
          "archivedByBId"
        FROM "Message"
        WHERE (
            ("archivedByAId" != ${currentUser.id}::uuid OR "archivedByAId" IS NULL)
            AND ("archivedByBId" != ${currentUser.id}::uuid OR "archivedByBId" IS NULL)
          ) AND ("senderId" = ${currentUser.id}::uuid OR "receiverId" = ${currentUser.id}::uuid)
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
    const message = await prisma.message.create({ data: { senderId: currentUser.id, ...data } })
    await prisma.notification.create({
      data: {
        initiatorId: currentUser.id,
        userId: data.receiverId,
        type: NotificationType.NEW_MESSAGE,
        messageId: message.id,
      },
    })
    return true
  }

  // DELETE CONVERSATION
  @UseAuth()
  @Mutation(() => Boolean)
  async deleteConversation(
    @CurrentUser() currentUser: User,
    @Arg("messageIds", () => [String]) messageIds: string[],
  ): Promise<Boolean> {
    for (const messageId of messageIds) {
      const message = await prisma.message.findUnique({ where: { id: messageId } })
      if (!message) continue
      if (!message.archivedByAId && !message.archivedAtA) {
        await prisma.message.update({
          where: { id: messageId },
          data: { archivedByAId: currentUser.id, archivedAtA: new Date() },
        })
      } else if (!message.archivedByBId && !message.archivedAtB) {
        await prisma.message.update({
          where: { id: messageId },
          data: { archivedByBId: currentUser.id, archivedAtB: new Date() },
        })
      }
    }
    return true
  }

  // DELETE MESSAGE
  @UseAuth()
  @Mutation(() => Boolean)
  async deleteMessage(
    @CurrentUser() currentUser: User,
    @Arg("messageId") messageId: string,
  ): Promise<Boolean> {
    const message = await prisma.message.findUnique({ where: { id: messageId } })
    if (!message) return false
    if (!message.archivedByAId && !message.archivedAtA) {
      await prisma.message.update({
        where: { id: messageId },
        data: { archivedByAId: currentUser.id, archivedAtA: new Date() },
      })
    } else if (!message.archivedByBId && !message.archivedAtB) {
      await prisma.message.update({
        where: { id: messageId },
        data: { archivedByBId: currentUser.id, archivedAtB: new Date() },
      })
    }
    return true
  }
}
