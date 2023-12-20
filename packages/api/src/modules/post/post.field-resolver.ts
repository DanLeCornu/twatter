import { FieldResolver, Resolver, Root } from "type-graphql"
import { Service } from "typedi"

import { S3_URL } from "../../lib/config"
import { prisma } from "../../lib/prisma"
import { Mention } from "../mention/mention.model"
import { Reply } from "../reply/reply.model"
import { UseCacheControl } from "../shared/middleware/UseCacheControl"
import { User } from "../user/user.model"
import { Post } from "./post.model"

@Service()
@Resolver(() => Post)
export default class PostFieldResolver {
  @UseCacheControl({ maxAge: 3600 })
  @FieldResolver(() => String, { nullable: true })
  image(@Root() post: Post) {
    if (!post.image) return null
    return S3_URL + post.image
  }

  @FieldResolver(() => User)
  user(@Root() post: Post) {
    return prisma.post.findUnique({ where: { id: post.id } }).user()
  }

  @FieldResolver(() => [Reply])
  replies(@Root() post: Post) {
    return prisma.post
      .findUnique({ where: { id: post.id } })
      .replies({ orderBy: { createdAt: "desc" }, where: { archivedAt: null } })
  }

  @FieldResolver(() => [Mention])
  mentions(@Root() post: Post) {
    return prisma.post.findUnique({ where: { id: post.id } }).mentions()
  }

  @FieldResolver(() => Number)
  replyCount(@Root() post: Post) {
    return prisma.reply.count({ where: { postId: post.id, archivedAt: null } })
  }

  @FieldResolver(() => Number)
  likeCount(@Root() post: Post) {
    return prisma.like.count({ where: { postId: post.id } })
  }

  @FieldResolver(() => Number)
  bookmarkCount(@Root() post: Post) {
    return prisma.bookmark.count({ where: { postId: post.id } })
  }

  @FieldResolver(() => Number)
  viewCount(@Root() post: Post) {
    return prisma.view.count({ where: { postId: post.id } })
  }
}
