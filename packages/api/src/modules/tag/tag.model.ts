import { Field, ObjectType } from "type-graphql"

import * as Prisma from "@twatter/database"

import { BaseModel } from "../shared/base.model"

@ObjectType()
export class Tag extends BaseModel implements Prisma.Tag {
  @Field()
  name: string
}
