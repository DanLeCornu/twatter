import { IsEmail, IsNotEmpty, Length } from "class-validator"
import { Field, InputType } from "type-graphql"

import { Verification } from "../verification.model"

@InputType()
export class VerifyInput implements Partial<Verification> {
  @IsNotEmpty()
  @Length(5)
  @IsEmail()
  @Field()
  email: string

  @IsNotEmpty()
  @Length(3, 50)
  @Field()
  name: string

  @IsNotEmpty()
  @Field()
  dob: string
}
