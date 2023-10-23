import { Field, ObjectType } from "type-graphql"

import { ConnectionResponse } from "../../shared/response/connection.response"
import { User } from "../../user/user.model"

@ObjectType()
export class ConversationsResponse extends ConnectionResponse(() => [Conversation]) {}

@ObjectType()
export class Conversation {
  @Field()
  id: string

  @Field()
  user: User

  @Field(() => [ConversationMessage])
  messages: ConversationMessage[]
}

// Note: Using this custom type instead of regular Message object as otherwise graphql complains about unable to serialize createdAt string to Date
@ObjectType()
class ConversationMessage {
  @Field()
  id: string

  @Field()
  text: string

  @Field()
  senderId: string

  @Field()
  receiverId: string

  @Field()
  createdAt: string
}
