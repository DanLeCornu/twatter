import { FieldResolver, Resolver, Root } from "type-graphql"
import { Service } from "typedi"

import { prisma } from "../../lib/prisma"
import { User } from "../user/user.model"
import { Message } from "./message.model"

@Service()
@Resolver(() => Message)
export default class MessageFieldResolver {
  @FieldResolver(() => User)
  sender(@Root() message: Message) {
    return prisma.message.findUnique({ where: { id: message.id } }).sender()
  }
  @FieldResolver(() => User)
  receiver(@Root() message: Message) {
    return prisma.message.findUnique({ where: { id: message.id } }).receiver()
  }
}
