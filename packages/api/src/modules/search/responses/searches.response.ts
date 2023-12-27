import { ObjectType } from "type-graphql"

import { ConnectionResponse } from "../../shared/response/connection.response"
import { Search } from "../search.model"

@ObjectType()
export class SearchesResponse extends ConnectionResponse(() => [Search]) {}
