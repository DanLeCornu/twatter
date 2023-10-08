import { Field, ObjectType } from "type-graphql"

import * as Prisma from "@twatter/database"

import { BaseModel } from "../shared/base.model"

@ObjectType()
export class Reply extends BaseModel implements Prisma.Reply {
  @Field()
  text: string

  @Field(() => String, { nullable: true })
  image: string | null

  @Field()
  userId: string

  @Field()
  postId: string

  @Field(() => Date, { nullable: true })
  archivedAt: Date | null
}
