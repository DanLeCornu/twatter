import { IsEmail, IsNotEmpty, Length } from "class-validator"
import { Field, InputType } from "type-graphql"

import { AllowMessagesFrom, DobPrivacy } from "@twatter/database/dist/generated"

import { User } from "../user.model"

@InputType()
export class UpdateUserInput implements Partial<User> {
  @IsNotEmpty()
  @Length(5)
  @IsEmail()
  @Field({ nullable: true })
  email?: string

  @IsNotEmpty()
  @Length(8)
  @Field({ nullable: true })
  password?: string

  @IsNotEmpty()
  @Field({ nullable: true })
  avatar?: string

  @IsNotEmpty()
  @Field({ nullable: true })
  cover?: string

  @IsNotEmpty()
  @Length(3, 50)
  @Field({ nullable: true })
  name?: string

  @IsNotEmpty()
  @Length(3, 15)
  @Field({ nullable: true })
  handle?: string

  @IsNotEmpty()
  @Length(0, 160)
  @Field({ nullable: true })
  bio?: string

  @IsNotEmpty()
  @Length(0, 30)
  @Field({ nullable: true })
  location?: string

  @IsNotEmpty()
  @Length(0, 100)
  @Field({ nullable: true })
  website?: string

  @IsNotEmpty()
  @Field({ nullable: true })
  dob?: string

  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  dobDayMonthPrivacy?: DobPrivacy

  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  dobYearPrivacy?: DobPrivacy

  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  allowMessagesFrom?: AllowMessagesFrom

  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  pinnedPostId?: string
}
