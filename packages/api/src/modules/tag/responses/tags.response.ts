import { ObjectType } from "type-graphql"

import { ConnectionResponse } from "../../shared/response/connection.response"
import { Tag } from "../tag.model"

@ObjectType()
export class TagsResponse extends ConnectionResponse(() => [Tag]) {}
