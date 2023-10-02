import { ObjectType } from "type-graphql"

import { ConnectionResponse } from "../../shared/response/connection.response"
import { Like } from "../like.model"

@ObjectType()
export class LikesResponse extends ConnectionResponse(() => [Like]) {}
