import { Field, ObjectType } from "type-graphql"

import * as Prisma from "@twatter/database"

import { BaseModel } from "../shared/base.model"

@ObjectType()
export class Search extends BaseModel implements Prisma.Search {
  @Field()
  text: string

  @Field()
  hidden: boolean

  @Field()
  userId: string
}
