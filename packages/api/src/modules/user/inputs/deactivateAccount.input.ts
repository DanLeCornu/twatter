import { IsNotEmpty, Length } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class DeactivateAccountInput {
  @IsNotEmpty()
  @Length(8)
  @Field()
  password: string
}
