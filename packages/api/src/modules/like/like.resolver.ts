import { Arg, Args, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"

import { FindManyLikeArgs } from "@twatter/database/dist/generated"

import { prisma } from "../../lib/prisma"
import { CurrentUser } from "../shared/currentUser"
import { UseAuth } from "../shared/middleware/UseAuth"
import { User } from "../user/user.model"
import { Like } from "./like.model"
import { LikesResponse } from "./responses/likes.response"

@Service()
@Resolver(() => Like)
export default class LikeResolver {
  // ALL LIKES
  @Query(() => LikesResponse)
  async likes(@Args() args: FindManyLikeArgs): Promise<LikesResponse> {
    const items = await prisma.like.findMany(args as any)
    const count = await prisma.like.count({
      ...(args as any),
      take: undefined,
      skip: undefined,
    })
    return { items, count }
  }

  // CREATE LIKE
  @UseAuth()
  @Mutation(() => Boolean)
  async createLike(@CurrentUser() currentUser: User, @Arg("postId") postId: string): Promise<Boolean> {
    await prisma.like.create({ data: { userId: currentUser.id, postId } })
    return true
  }

  // DESTROY LIKE
  @UseAuth()
  @Mutation(() => Boolean)
  async destroyLike(@CurrentUser() currentUser: User, @Arg("postId") postId: string): Promise<Boolean> {
    const like = await prisma.like.findFirst({ where: { userId: currentUser.id, postId } })
    if (!like) return true
    await prisma.like.delete({ where: { id: like.id } })
    return true
  }
}
