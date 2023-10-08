import { Field, ObjectType } from "type-graphql"

import * as Prisma from "@twatter/database"

import { BaseModel } from "../shared/base.model"

@ObjectType()
export class View extends BaseModel implements Prisma.View {
  @Field()
  userId: string

  @Field()
  postId: string
}
