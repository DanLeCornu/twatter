import { FieldResolver, Resolver, Root } from "type-graphql"
import { Service } from "typedi"

import { S3_URL } from "../../lib/config"
import { prisma } from "../../lib/prisma"
import { Post } from "../post/post.model"
import { UseCacheControl } from "../shared/middleware/UseCacheControl"
import { User } from "../user/user.model"
import { Reply } from "./reply.model"

@Service()
@Resolver(() => Reply)
export default class ReplyFieldResolver {
  @UseCacheControl({ maxAge: 3600 })
  @FieldResolver(() => String, { nullable: true })
  image(@Root() reply: Reply) {
    if (!reply.image) return null
    return S3_URL + reply.image
  }

  @FieldResolver(() => User)
  user(@Root() reply: Reply) {
    return prisma.reply.findUnique({ where: { id: reply.id } }).user()
  }

  @FieldResolver(() => Post)
  post(@Root() reply: Reply) {
    return prisma.reply.findUnique({ where: { id: reply.id } }).post()
  }
}
