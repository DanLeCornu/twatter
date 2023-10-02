import { Arg, Args, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"

import { FindManyBookmarkArgs } from "@twatter/database/dist/generated"

import { prisma } from "../../lib/prisma"
import { CurrentUser } from "../shared/currentUser"
import { UseAuth } from "../shared/middleware/UseAuth"
import { User } from "../user/user.model"
import { Bookmark } from "./bookmark.model"
import { BookmarksResponse } from "./responses/bookmarks.response"

@Service()
@Resolver(() => Bookmark)
export default class BookmarkResolver {
  // ALL BOOKMARKS
  @Query(() => BookmarksResponse)
  async bookmarks(@Args() args: FindManyBookmarkArgs): Promise<BookmarksResponse> {
    const items = await prisma.bookmark.findMany(args as any)
    const count = await prisma.bookmark.count({
      ...(args as any),
      take: undefined,
      skip: undefined,
    })
    return { items, count }
  }

  // CREATE BOOKMARK
  @UseAuth()
  @Mutation(() => Boolean)
  async createBookmark(@CurrentUser() currentUser: User, @Arg("postId") postId: string): Promise<Boolean> {
    await prisma.bookmark.create({ data: { userId: currentUser.id, postId } })
    return true
  }

  // DESTROY BOOKMARK
  @UseAuth()
  @Mutation(() => Boolean)
  async destroyBookmark(@CurrentUser() currentUser: User, @Arg("postId") postId: string): Promise<Boolean> {
    const bookmark = await prisma.bookmark.findFirst({ where: { userId: currentUser.id, postId } })
    if (!bookmark) return true
    await prisma.bookmark.delete({ where: { id: bookmark.id } })
    return true
  }
}
