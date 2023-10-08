import { FieldResolver, Resolver, Root } from "type-graphql"
import { Service } from "typedi"

import { prisma } from "../../lib/prisma"
import { Post } from "../post/post.model"
import { Bookmark } from "./bookmark.model"

@Service()
@Resolver(() => Bookmark)
export default class BookmarkFieldResolver {
  @FieldResolver(() => Post)
  post(@Root() bookmark: Bookmark) {
    return prisma.bookmark.findUnique({ where: { id: bookmark.id } }).post()
  }
}
