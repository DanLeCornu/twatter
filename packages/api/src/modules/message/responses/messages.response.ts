import { ObjectType } from "type-graphql"

import { ConnectionResponse } from "../../shared/response/connection.response"
import { Message } from "../message.model"

@ObjectType()
export class MessagesResponse extends ConnectionResponse(() => [Message]) {}
