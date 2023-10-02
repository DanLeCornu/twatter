import { ObjectType } from "type-graphql"

import { ConnectionResponse } from "../../shared/response/connection.response"
import { Reply } from "../reply.model"

@ObjectType()
export class RepliesResponse extends ConnectionResponse(() => [Reply]) {}
