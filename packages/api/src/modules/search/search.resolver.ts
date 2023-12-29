import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"

import { prisma } from "../../lib/prisma"
import { CurrentUser } from "../shared/currentUser"
import { UseAuth } from "../shared/middleware/UseAuth"
import { User } from "../user/user.model"
import { SearchesResponse } from "./responses/searches.response"
import { Search } from "./search.model"

@Service()
@Resolver(() => Search)
export default class SearchResolver {
  // RECENT SEARCHES
  @UseAuth()
  @Query(() => SearchesResponse)
  async recentSearches(@CurrentUser() currentUser: User): Promise<SearchesResponse> {
    const items = await prisma.search.findMany({
      where: { userId: currentUser.id, hidden: false },
      orderBy: { createdAt: "desc" },
    })
    return { items, count: items.length }
  }

  // CREATE SEARCH
  @UseAuth()
  @Mutation(() => Boolean)
  async createSearch(@CurrentUser() currentUser: User, @Arg("text") text: string): Promise<Boolean> {
    await prisma.search.create({ data: { userId: currentUser.id, text } })
    return true
  }

  // CLEAR SEARCH
  @UseAuth()
  @Mutation(() => Boolean)
  async clearSearch(@CurrentUser() currentUser: User, @Arg("id") id: string): Promise<Boolean> {
    const search = await prisma.search.findFirst({ where: { id, userId: currentUser.id } })
    if (!search || search.hidden === true) return false
    await prisma.search.update({ where: { id }, data: { hidden: true } })
    return true
  }

  // CLEAR ALL SEARCHES
  @UseAuth()
  @Mutation(() => Boolean)
  async clearAllSearches(@CurrentUser() currentUser: User): Promise<Boolean> {
    await prisma.search.updateMany({ where: { userId: currentUser.id }, data: { hidden: true } })
    return true
  }
}
