import { Arg, Mutation, Resolver } from "type-graphql"
import { Service } from "typedi"

import { prisma } from "../../lib/prisma"
import { CurrentUser } from "../shared/currentUser"
import { UseAuth } from "../shared/middleware/UseAuth"
import { User } from "../user/user.model"
import { CreateMessageInput } from "./inputs/createMessage.input"
import { Message } from "./message.model"

@Service()
@Resolver(() => Message)
export default class MessageResolver {
  // CREATE MESSAGE
  @UseAuth()
  @Mutation(() => Boolean)
  async createMessage(
    @CurrentUser() currentUser: User,
    @Arg("data") data: CreateMessageInput,
  ): Promise<Boolean> {
    await prisma.message.create({ data: { senderId: currentUser.id, ...data } })
    return true
  }
}
