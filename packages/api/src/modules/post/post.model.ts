import { Field, ObjectType } from "type-graphql"

import * as Prisma from "@twatter/database"

import { BaseModel } from "../shared/base.model"

@ObjectType()
export class Post extends BaseModel implements Prisma.Post {
  @Field()
  text: string

  @Field(() => String, { nullable: true })
  image: string | null

  @Field()
  userId: string

  @Field(() => Date, { nullable: true })
  archivedAt: Date | null
}
