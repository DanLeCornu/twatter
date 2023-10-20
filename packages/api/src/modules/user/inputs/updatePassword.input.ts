import { IsNotEmpty, Length } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class UpdatePasswordInput {
  @IsNotEmpty()
  @Length(8)
  @Field()
  newPassword: string

  @IsNotEmpty()
  @Length(8)
  @Field()
  currentPassword: string
}
