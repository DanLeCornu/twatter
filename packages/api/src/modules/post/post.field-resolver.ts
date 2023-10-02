import { FieldResolver, Resolver, Root } from "type-graphql"
import { Service } from "typedi"

import { prisma } from "../../lib/prisma"
import { Reply } from "../reply/reply.model"
import { User } from "../user/user.model"
import { Post } from "./post.model"

@Service()
@Resolver(() => Post)
export default class PostFieldResolver {
  @FieldResolver(() => User)
  user(@Root() post: Post) {
    return prisma.post.findUnique({ where: { id: post.id } }).user()
  }

  @FieldResolver(() => [Reply])
  replies(@Root() post: Post) {
    return prisma.post.findUnique({ where: { id: post.id } }).replies({ orderBy: { createdAt: "desc" } })
  }

  @FieldResolver(() => Number)
  replyCount(@Root() post: Post) {
    return prisma.reply.count({ where: { postId: post.id } })
  }

  @FieldResolver(() => Number)
  likeCount(@Root() post: Post) {
    return prisma.like.count({ where: { postId: post.id } })
  }

  @FieldResolver(() => Number)
  viewCount(@Root() post: Post) {
    return prisma.view.count({ where: { postId: post.id } })
  }
}
