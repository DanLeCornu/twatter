import { IsEmail, IsNotEmpty, Length } from "class-validator"
import { Field, InputType } from "type-graphql"

import { User } from "../user.model"

@InputType()
export class RegisterInput implements Partial<User> {
  @IsNotEmpty()
  @Length(5)
  @IsEmail()
  @Field()
  email: string

  @IsNotEmpty()
  @Length(8)
  @Field()
  password: string

  @IsNotEmpty()
  @Length(3, 50)
  @Field()
  name: string

  @IsNotEmpty()
  @Length(3, 15)
  @Field()
  handle: string

  @IsNotEmpty()
  @Length(0, 160)
  @Field({ nullable: true })
  bio?: string

  @IsNotEmpty()
  @Length(0, 30)
  @Field({ nullable: true })
  location?: string
}
