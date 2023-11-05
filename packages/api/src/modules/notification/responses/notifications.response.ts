import { ObjectType } from "type-graphql"

import { ConnectionResponse } from "../../shared/response/connection.response"
import { Notification } from "../notification.model"

@ObjectType()
export class NotificationsResponse extends ConnectionResponse(() => [Notification]) {}
