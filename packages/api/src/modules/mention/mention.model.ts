import { Field, ObjectType } from "type-graphql"

import * as Prisma from "@twatter/database"

import { BaseModel } from "../shared/base.model"

@ObjectType()
export class Mention extends BaseModel implements Prisma.Mention {
  @Field()
  userId: string

  @Field()
  postId: string
}
