import { FieldResolver, Resolver, Root } from "type-graphql"
import { Service } from "typedi"

import { prisma } from "../../lib/prisma"
import { Post } from "../post/post.model"
import { User } from "../user/user.model"
import { Reply } from "./reply.model"

@Service()
@Resolver(() => Reply)
export default class ReplyFieldResolver {
  @FieldResolver(() => User)
  user(@Root() reply: Reply) {
    return prisma.reply.findUnique({ where: { id: reply.id } }).user()
  }

  @FieldResolver(() => Post)
  post(@Root() reply: Reply) {
    return prisma.reply.findUnique({ where: { id: reply.id } }).post()
  }
}
