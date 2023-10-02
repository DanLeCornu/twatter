import { Field, ObjectType } from "type-graphql"

import * as Prisma from "@twatter/database"

import { BaseModel } from "../shared/base.model"

@ObjectType()
export class Like extends BaseModel implements Prisma.Like {
  @Field()
  userId: string

  @Field()
  postId: string
}
