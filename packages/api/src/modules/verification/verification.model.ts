import { Field, ObjectType } from "type-graphql"

import * as Prisma from "@twatter/database"

import { BaseModel } from "../shared/base.model"

@ObjectType()
export class Verification extends BaseModel implements Prisma.Verification {
  @Field()
  email: string

  @Field()
  name: string

  @Field()
  dob: string

  @Field()
  verificationCode: string

  @Field(() => Date, { nullable: true })
  verifiedAt: Date | null
}
