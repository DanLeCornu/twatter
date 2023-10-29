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
