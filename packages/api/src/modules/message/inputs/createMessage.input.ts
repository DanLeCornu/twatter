import { IsNotEmpty } from "class-validator"
import { Field, InputType } from "type-graphql"

import { Message } from "../message.model"

@InputType()
export class CreateMessageInput implements Partial<Message> {
  @IsNotEmpty()
  @Field()
  text: string

  @IsNotEmpty()
  @Field()
  receiverId: string
}
