import { FieldResolver, Resolver, Root } from "type-graphql"
import { Service } from "typedi"
import { prisma } from "../../lib/prisma"
import { User } from "../user/user.model"
import { Mention } from "./mention.model"

@Service()
@Resolver(() => Mention)
export default class MentionFieldResolver {
  @FieldResolver(() => User)
  user(@Root() mention: Mention) {
    return prisma.mention.findUnique({ where: { id: mention.id } }).user()
  }
}
