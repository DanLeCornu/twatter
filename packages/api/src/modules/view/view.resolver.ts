import { Arg, Mutation, Resolver } from "type-graphql"
import { Service } from "typedi"

import { prisma } from "../../lib/prisma"
import { CurrentUser } from "../shared/currentUser"
import { UseAuth } from "../shared/middleware/UseAuth"
import { User } from "../user/user.model"
import { View } from "./view.model"

@Service()
@Resolver(() => View)
export default class ViewResolver {
  // CREATE VIEW
  @UseAuth()
  @Mutation(() => Boolean)
  async createView(@CurrentUser() currentUser: User, @Arg("postId") postId: string): Promise<Boolean> {
    await prisma.view.create({ data: { userId: currentUser.id, postId } })
    return true
  }
}
