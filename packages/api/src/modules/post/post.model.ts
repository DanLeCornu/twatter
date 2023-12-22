import { Field, ObjectType } from "type-graphql"

import * as Prisma from "@twatter/database"

import { BaseModel } from "../shared/base.model"

@ObjectType()
export class Post extends BaseModel implements Prisma.Post {
  @Field()
  text: string

  image: string | null

  @Field()
  userId: string

  @Field(() => String, { nullable: true })
  parentId: string | null

  @Field(() => Date, { nullable: true })
  archivedAt: Date | null
}
