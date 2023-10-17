import { Args, Query, Resolver } from "type-graphql"
import { Service } from "typedi"

import { FindManyTagArgs } from "@twatter/database/dist/generated"

import { prisma } from "../../lib/prisma"
import { TagsResponse } from "./responses/tags.response"
import { Tag } from "./tag.model"

@Service()
@Resolver(() => Tag)
export default class TagResolver {
  // ALL TAGS
  @Query(() => TagsResponse)
  async tags(@Args() args: FindManyTagArgs): Promise<TagsResponse> {
    const items = await prisma.tag.findMany(args as any)
    const count = await prisma.tag.count({
      ...(args as any),
      take: undefined,
      skip: undefined,
    })
    return { items, count }
  }
}
