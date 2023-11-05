import { Arg, Args, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"

import { FindManyNotificationArgs, NotificationStatus } from "@twatter/database/dist/generated"

import { AppError } from "../../lib/appError"
import { prisma } from "../../lib/prisma"
import { CurrentUser } from "../shared/currentUser"
import { UseAuth } from "../shared/middleware/UseAuth"
import { User } from "../user/user.model"
import { NotificationsResponse } from "./responses/notifications.response"

@Service()
@Resolver(() => Notification)
export default class NotificationResolver {
  // ALL NOTIFICATIONS
  @UseAuth()
  @Query(() => NotificationsResponse)
  async notifications(
    @Args() args: FindManyNotificationArgs,
    @CurrentUser() currentUser: User,
  ): Promise<NotificationsResponse> {
    const items = await prisma.notification.findMany({
      ...(args as any),
      where: { ...args.where, userId: currentUser.id },
    })
    const count = await prisma.notification.count({
      ...(args as any),
      where: { ...args.where, userId: currentUser.id },
      take: undefined,
      skip: undefined,
    })
    return { items, count }
  }

  // MARK AS READ
  @UseAuth()
  @Mutation(() => Boolean)
  async markAsRead(@CurrentUser() currentUser: User, @Arg("id") id: string): Promise<Boolean> {
    const notification = await prisma.notification.findUnique({ where: { id } })
    if (!notification || notification.userId !== currentUser.id) throw new AppError("Notification not found")
    await prisma.notification.update({ where: { id }, data: { status: NotificationStatus.READ } })
    return true
  }
}
