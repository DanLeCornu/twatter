import { IsNotEmpty } from "class-validator"
import { Field, InputType } from "type-graphql"

import { Reply } from "../reply.model"

@InputType()
export class CreateReplyInput implements Partial<Reply> {
  @IsNotEmpty()
  @Field()
  text: string

  @IsNotEmpty()
  @Field()
  postId: string
}
