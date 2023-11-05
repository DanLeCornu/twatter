import { Arg, Args, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"

import { FindFirstPostArgs, FindManyPostArgs, PostUpdateInput } from "@twatter/database/dist/generated"

import { prisma } from "../../lib/prisma"
import { CurrentUser } from "../shared/currentUser"
import { UseAuth } from "../shared/middleware/UseAuth"
import { User } from "../user/user.model"
import { CreatePostInput } from "./inputs/createPost.input"
import { Post } from "./post.model"
import { PostsResponse } from "./responses/posts.response"

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
    return await prisma.post.create({ data: { ...data, user: { connect: { id: currentUser.id } } } })
    // TODO check if mentioning someone, if so, send them a notification
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
