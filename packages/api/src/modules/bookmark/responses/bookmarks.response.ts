import { ObjectType } from "type-graphql"

import { ConnectionResponse } from "../../shared/response/connection.response"
import { Bookmark } from "../bookmark.model"

@ObjectType()
export class BookmarksResponse extends ConnectionResponse(() => [Bookmark]) {}
