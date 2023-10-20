import { FieldResolver, Resolver, Root } from "type-graphql"
import { Service } from "typedi"

import { S3_URL } from "../../lib/config"
import { prisma } from "../../lib/prisma"
import { Bookmark } from "../bookmark/bookmark.model"
import { Like } from "../like/like.model"
import { Post } from "../post/post.model"
import { Report } from "../report/report.model"
import { UseCacheControl } from "../shared/middleware/UseCacheControl"
import { User } from "./user.model"

@Service()
@Resolver(() => User)
export default class UserFieldResolver {
  @UseCacheControl({ maxAge: 3600 })
  @FieldResolver(() => String, { nullable: true })
  avatar(@Root() user: User) {
    if (!user.avatar) return null
    return S3_URL + user.avatar
  }

  @UseCacheControl({ maxAge: 3600 })
  @FieldResolver(() => String, { nullable: true })
  cover(@Root() user: User) {
    if (!user.cover) return null
    return S3_URL + user.cover
  }

  @FieldResolver(() => [User])
  followers(@Root() user: User) {
    return prisma.user.findUnique({ where: { id: user.id } }).followers({
      select: { id: true, avatar: true, name: true, handle: true, bio: true },
      where: { archivedAt: null },
    })
  }

  @FieldResolver(() => Number)
  async followerCount(@Root() user: User) {
    const followers = await prisma.user
      .findUnique({ where: { id: user.id } })
      .followers({ select: { id: true }, where: { archivedAt: null } })
    return followers?.length || 0
  }

  @FieldResolver(() => [User])
  following(@Root() user: User) {
    return prisma.user.findUnique({ where: { id: user.id } }).following({
      select: { id: true, avatar: true, name: true, handle: true, bio: true },
      where: { archivedAt: null },
    })
  }

  @FieldResolver(() => Number)
  async followingCount(@Root() user: User) {
    const following = await prisma.user
      .findUnique({ where: { id: user.id } })
      .following({ select: { id: true }, where: { archivedAt: null } })
    return following?.length || 0
  }

  @FieldResolver(() => [Post])
  posts(@Root() user: User) {
    return prisma.user.findUnique({ where: { id: user.id } }).posts({
      orderBy: { createdAt: "desc" },
      where: { archivedAt: null },
      select: { id: true, text: true, createdAt: true },
    })
  }

  @FieldResolver(() => Number)
  postCount(@Root() user: User) {
    return prisma.post.count({ where: { userId: user.id } })
  }

  @FieldResolver(() => Post, { nullable: true })
  pinnedPost(@Root() user: User) {
    if (!user.pinnedPostId) return null
    return prisma.user.findUnique({ where: { id: user.id } }).pinnedPost()
  }

  @FieldResolver(() => [Like])
  likes(@Root() user: User) {
    return prisma.user.findUnique({ where: { id: user.id } }).likes({ select: { postId: true } })
  }

  @FieldResolver(() => [Bookmark])
  bookmarks(@Root() user: User) {
    return prisma.user.findUnique({ where: { id: user.id } }).bookmarks({
      orderBy: { createdAt: "desc" },
      where: { post: { archivedAt: null } },
    })
  }

  @FieldResolver(() => [User])
  mutedAccounts(@Root() user: User) {
    return prisma.user
      .findUnique({ where: { id: user.id } })
      .mutedAccounts({ select: { id: true }, where: { archivedAt: null } })
  }

  @FieldResolver(() => [User])
  blockedAccounts(@Root() user: User) {
    return prisma.user
      .findUnique({ where: { id: user.id } })
      .blockedAccounts({ select: { id: true }, where: { archivedAt: null } })
  }

  @FieldResolver(() => [Report])
  createdReports(@Root() user: User) {
    return prisma.user.findUnique({ where: { id: user.id } }).createdReports()
  }
}
