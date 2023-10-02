import { IsNotEmpty } from "class-validator"
import { Field, InputType } from "type-graphql"

import { ReportType } from "@twatter/database/dist/generated"

import { Report } from "../report.model"

@InputType()
export class CreateReportInput implements Partial<Report> {
  @IsNotEmpty()
  @Field(() => String)
  type: ReportType

  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  userId?: string | null

  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  postId?: string | null

  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  replyId?: string | null
}
