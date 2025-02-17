import { IsNotEmpty, Length } from "class-validator"
import { Field, InputType } from "type-graphql"

import { User } from "../user.model"

@InputType()
export class ResetPasswordInput implements Partial<User> {
  @IsNotEmpty()
  @Length(8)
  @Field()
  password: string

  @IsNotEmpty()
  @Field()
  token: string
}
