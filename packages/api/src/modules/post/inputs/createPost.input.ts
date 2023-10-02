import { IsNotEmpty } from "class-validator"
import { Field, InputType } from "type-graphql"

import { Post } from "../post.model"

@InputType()
export class CreatePostInput implements Partial<Post> {
  @IsNotEmpty()
  @Field()
  text: string
}
