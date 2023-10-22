import { Field, ObjectType } from "type-graphql"

import { ConnectionResponse } from "../../shared/response/connection.response"

@ObjectType()
export class ConversationsResponse extends ConnectionResponse(() => [Conversation]) {}

@ObjectType()
export class Conversation {
  @Field()
  conversationId: string

  @Field(() => [ConversationMessage])
  messages: ConversationMessage[]
}

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
