import { IsEmail, IsNotEmpty, Length } from "class-validator"
import { Field, InputType } from "type-graphql"

import { User } from "../user.model"

@InputType()
export class LoginInput implements Partial<User> {
  @IsNotEmpty()
  @Length(5)
  @IsEmail()
  @Field()
  email: string

  @IsNotEmpty()
  @Length(8)
  @Field()
  password: string
}
