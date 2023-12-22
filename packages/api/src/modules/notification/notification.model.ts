import { Field, ObjectType } from "type-graphql"

import * as Prisma from "@twatter/database"
import { NotificationStatus, NotificationType } from "@twatter/database/dist/generated"

import { BaseModel } from "../shared/base.model"

@ObjectType()
export class Notification extends BaseModel implements Prisma.Notification {
  @Field(() => NotificationType)
  type: Prisma.NotificationType

  @Field(() => NotificationStatus)
  status: Prisma.NotificationStatus

  @Field()
  initiatorId: string

  @Field()
  userId: string

  @Field(() => String, { nullable: true })
  messageId: string | null

  @Field(() => String, { nullable: true })
  postId: string | null
}
