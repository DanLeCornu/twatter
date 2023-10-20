import { Field, ObjectType } from "type-graphql"

import * as Prisma from "@twatter/database"
import { DobPrivacy, Role } from "@twatter/database/dist/generated"

import { BaseModel } from "../shared/base.model"
import { UseIsCurrentUser } from "./middleware/UseIsCurrentUser"

@ObjectType()
export class User extends BaseModel implements Prisma.User {
  @UseIsCurrentUser()
  @Field()
  email: string

  password: string | null

  @Field()
  name: string

  @Field(() => String, { nullable: true })
  handle: string | null

  @Field(() => String, { nullable: true })
  dob: string | null

  @Field(() => String, { nullable: true })
  bio: string | null

  @Field(() => String, { nullable: true })
  location: string | null

  @Field(() => String, { nullable: true })
  website: string | null

  @Field(() => Role)
  role: Prisma.Role

  avatar: string | null

  cover: string | null

  @Field(() => DobPrivacy)
  dobDayMonthPrivacy: Prisma.DobPrivacy

  @Field(() => DobPrivacy)
  dobYearPrivacy: Prisma.DobPrivacy

  @Field(() => String, { nullable: true })
  pinnedPostId: string | null

  @Field(() => Date, { nullable: true })
  archivedAt: Date | null
}
