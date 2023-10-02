import { Arg, Args, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"

import { FindFirstReplyArgs, FindManyReplyArgs } from "@twatter/database/dist/generated"

import { prisma } from "../../lib/prisma"
import { CurrentUser } from "../shared/currentUser"
import { UseAuth } from "../shared/middleware/UseAuth"
import { User } from "../user/user.model"
import { CreateReplyInput } from "./inputs/createReply.input"
import { Reply } from "./reply.model"
import { RepliesResponse } from "./responses/replies.response"

@Service()
@Resolver(() => Reply)
export default class ReplyResolver {
  // GET REPLY
  @Query(() => Reply, { nullable: true })
  async reply(@Args() args: FindFirstReplyArgs): Promise<Reply | null> {
    return await prisma.reply.findFirst(args as any)
  }

  // ALL REPLIES
  @Query(() => RepliesResponse)
  async replies(@Args() args: FindManyReplyArgs): Promise<RepliesResponse> {
    const items = await prisma.reply.findMany(args as any)
    const count = await prisma.reply.count({
      ...(args as any),
      take: undefined,
      skip: undefined,
    })
    return { items, count }
  }

  // CREATE REPLY
  @UseAuth()
  @Mutation(() => Reply)
  async createReply(@CurrentUser() currentUser: User, @Arg("data") data: CreateReplyInput): Promise<Reply> {
    return await prisma.reply.create({ data: { userId: currentUser.id, ...data } })
  }
}
