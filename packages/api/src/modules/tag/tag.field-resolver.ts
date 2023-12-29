import { FieldResolver, Resolver, Root } from "type-graphql"
import { Service } from "typedi"

import { prisma } from "../../lib/prisma"
import { Tag } from "./tag.model"

@Service()
@Resolver(() => Tag)
export default class TagFieldResolver {
  @FieldResolver(() => Number)
  async postCount(@Root() tag: Tag) {
    const posts = await prisma.tag.findUnique({ where: { id: tag.id } }).posts()
    if (!posts) return 0
    return posts.length
  }
}
