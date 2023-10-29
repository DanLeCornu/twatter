import { Field, ObjectType } from "type-graphql"

import * as Prisma from "@twatter/database"
import { ReportType } from "@twatter/database/dist/generated"

import { BaseModel } from "../shared/base.model"

@ObjectType()
export class Report extends BaseModel implements Prisma.Report {
  @Field(() => ReportType)
  type: Prisma.ReportType

  @Field()
  creatorId: string

  @Field(() => String, { nullable: true })
  userId: string | null

  @Field(() => String, { nullable: true })
  postId: string | null

  @Field(() => String, { nullable: true })
  replyId: string | null

  @Field(() => String, { nullable: true })
  messageId: string | null
}
