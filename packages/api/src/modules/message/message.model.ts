import { Field, ObjectType } from "type-graphql"

import * as Prisma from "@twatter/database"

import { BaseModel } from "../shared/base.model"

@ObjectType()
export class Message extends BaseModel implements Prisma.Message {
  @Field()
  text: string

  @Field()
  senderId: string

  @Field()
  receiverId: string

  @Field({ nullable: true })
  archivedByA: string

  @Field(() => Date, { nullable: true })
  archivedAtA: Date | null

  @Field({ nullable: true })
  archivedByB: string

  @Field(() => Date, { nullable: true })
  archivedAtB: Date | null
}
