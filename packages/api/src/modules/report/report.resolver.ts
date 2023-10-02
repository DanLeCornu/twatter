import { Arg, Mutation, Resolver } from "type-graphql"
import { Service } from "typedi"

import { prisma } from "../../lib/prisma"
import { CurrentUser } from "../shared/currentUser"
import { UseAuth } from "../shared/middleware/UseAuth"
import { User } from "../user/user.model"
import { CreateReportInput } from "./inputs/createReport.input"
import { Report } from "./report.model"

@Service()
@Resolver(() => Report)
export default class ReportResolver {
  // // GET REPLY
  // @Query(() => Reply, { nullable: true })
  // async reply(@Args() args: FindFirstReplyArgs): Promise<Reply | null> {
  //   return await prisma.reply.findFirst(args as any)
  // }

  // // ALL REPLIES
  // @Query(() => RepliesResponse)
  // async replies(@Args() args: FindManyReplyArgs): Promise<RepliesResponse> {
  //   const items = await prisma.reply.findMany(args as any)
  //   const count = await prisma.reply.count({
  //     ...(args as any),
  //     take: undefined,
  //     skip: undefined,
  //   })
  //   return { items, count }
  // }

  // CREATE REPORT
  @UseAuth()
  @Mutation(() => Boolean)
  async createReport(
    @CurrentUser() currentUser: User,
    @Arg("data") data: CreateReportInput,
  ): Promise<Boolean> {
    await prisma.report.create({ data: { creatorId: currentUser.id, ...data } })
    return true
  }
}
