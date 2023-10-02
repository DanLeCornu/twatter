import { Field, ObjectType } from "type-graphql"

import * as Prisma from "@twatter/database"

import { BaseModel } from "../shared/base.model"

@ObjectType()
export class Bookmark extends BaseModel implements Prisma.Bookmark {
  @Field()
  userId: string

  @Field()
  postId: string
}
