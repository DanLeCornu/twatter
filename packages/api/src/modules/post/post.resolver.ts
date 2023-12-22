import { Arg, Args, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"

import {
  FindFirstPostArgs,
  FindManyPostArgs,
  NotificationType,
  PostUpdateInput,
} from "@twatter/database/dist/generated"

import { prisma } from "../../lib/prisma"
import { CurrentUser } from "../shared/currentUser"
import { UseAuth } from "../shared/middleware/UseAuth"
import { User } from "../user/user.model"
import { CreatePostInput } from "./inputs/createPost.input"
import { Post } from "./post.model"
import { PostsResponse } from "./responses/posts.response"
import { stringsOnly, uniq } from "../../lib/helpers"

@Service()
@Resolver(() => Post)
export default class PostResolver {
  // GET POST
  @Query(() => Post, { nullable: true })
  async post(@Args() args: FindFirstPostArgs): Promise<Post | null> {
    return await prisma.post.findFirst({
      ...(args as any),
      where: {
        archivedAt: null,
        user: { archivedAt: null },
        ...args.where,
      },
    })
  }

  // ALL POSTS
  @Query(() => PostsResponse)
  async posts(@CurrentUser() currentUser: User, @Args() args: FindManyPostArgs): Promise<PostsResponse> {
    const mutedAccountIds =
      (
        await prisma.user
          .findUnique({ where: { id: currentUser.id } })
          .mutedAccounts({ select: { id: true } })
      )?.map((u) => u.id) || []
    const blockedAccountIds =
      (
        await prisma.user
          .findUnique({ where: { id: currentUser.id } })
          .blockedAccounts({ select: { id: true } })
      )?.map((u) => u.id) || []

    const items = await prisma.post.findMany({
      ...(args as any),
      where: {
        archivedAt: null,
        user: { id: { notIn: [...mutedAccountIds, ...blockedAccountIds] }, archivedAt: null },
        ...args.where,
      },
    })
    const count = await prisma.post.count({
      ...(args as any),
      where: {
        archivedAt: null,
        user: { id: { notIn: [...mutedAccountIds, ...blockedAccountIds] }, archivedAt: null },
        ...args.where,
      },
      take: undefined,
      skip: undefined,
    })
    return { items, count }
  }

  // CREATE POST
  @UseAuth()
  @Mutation(() => Post)
  async createPost(@CurrentUser() currentUser: User, @Arg("data") data: CreatePostInput): Promise<Post> {
    const { handles, parentId, ...values } = data
    const mentionedUsers = await prisma.user.findMany({
      where: { handle: { in: uniq(handles) } },
      select: { id: true, handle: true },
    })
    const validHandles = mentionedUsers.map((user) => user.handle)

    const post = await prisma.post.create({
      data: {
        ...values,
        parent: parentId ? { connect: { id: parentId } } : undefined,
        mentions: {
          create: stringsOnly(validHandles).map((handle) => ({ user: { connect: { handle } } })),
        },
        user: { connect: { id: currentUser.id } },
      },
    })
    if (mentionedUsers.length > 0) {
      mentionedUsers.forEach(async (user) => {
        await prisma.notification.create({
          data: {
            initiatorId: currentUser.id,
            userId: user.id,
            type: NotificationType.NEW_MENTION,
            postId: post.id,
          },
        })
      })
    }
    if (parentId) {
      const parentPost = await prisma.post.findUnique({ where: { id: parentId } })
      if (parentPost && parentPost.userId !== currentUser.id) {
        await prisma.notification.create({
          data: {
            initiatorId: currentUser.id,
            userId: parentPost.userId,
            type: NotificationType.NEW_REPLY,
            postId: parentPost.id,
          },
        })
      }
    }
    // TODO check if mentioning someone, if so, send them an email, depending on email settings
    return post
  }

  // UPDATE POST
  @UseAuth()
  @Mutation(() => Post)
  async updatePost(@Arg("postId") postId: string, @Arg("data") data: PostUpdateInput): Promise<Post> {
    // TODO permissions: only update your own posts
    const post = await prisma.post.findUnique({ where: { id: postId } })
    if (!post || post.archivedAt) throw new Error("Post not found")
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await prisma.post.update({ where: { id: postId }, data })
  }
}
