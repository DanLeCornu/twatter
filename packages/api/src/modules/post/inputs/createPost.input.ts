import { IsNotEmpty } from "class-validator"
import { Field, InputType } from "type-graphql"

import { TagCreateNestedManyWithoutPostsInput } from "@twatter/database/dist/generated"

import { Post } from "../post.model"

@InputType()
export class CreatePostInput implements Partial<Post> {
  @IsNotEmpty()
  @Field()
  text: string

  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  image?: string

  @Field()
  tags?: TagCreateNestedManyWithoutPostsInput
}
