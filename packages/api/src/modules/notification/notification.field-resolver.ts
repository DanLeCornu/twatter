import { FieldResolver, Resolver, Root } from "type-graphql"
import { Service } from "typedi"

import { prisma } from "../../lib/prisma"
import { Message } from "../message/message.model"
import { Post } from "../post/post.model"
import { Reply } from "../reply/reply.model"
import { User } from "../user/user.model"
import { Notification } from "./notification.model"

@Service()
@Resolver(() => Notification)
export default class NotificationFieldResolver {
  @FieldResolver(() => User)
  initiator(@Root() notification: Notification) {
    return prisma.notification.findUnique({ where: { id: notification.id } }).initiator()
  }

  @FieldResolver(() => User)
  user(@Root() notification: Notification) {
    return prisma.notification.findUnique({ where: { id: notification.id } }).user()
  }

  @FieldResolver(() => Message, { nullable: true })
  message(@Root() notification: Notification) {
    return prisma.notification.findUnique({ where: { id: notification.id } }).message()
  }

  @FieldResolver(() => Post, { nullable: true })
  post(@Root() notification: Notification) {
    return prisma.notification.findUnique({ where: { id: notification.id } }).post()
  }

  @FieldResolver(() => Reply, { nullable: true })
  reply(@Root() notification: Notification) {
    return prisma.notification.findUnique({ where: { id: notification.id } }).reply()
  }
}
