import * as React from "react"
import { Stack, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"

import { QueryMode, SortOrder, useGetPostsQuery } from "lib/graphql"

import { PostItem } from "./PostItem"

export function SearchLatest() {
  const router = useRouter()
  const query = router.query.q as string

  const { data, loading } = useGetPostsQuery({
    variables: {
      orderBy: { createdAt: SortOrder.Desc },
      where: {
        OR: [{ text: query ? { contains: query, mode: QueryMode.Insensitive } : undefined }],
      },
    },
  })
  const posts = data?.posts.items || []

  if (loading) return null

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post, i) => (
          <Stack key={i} spacing={6}>
            <PostItem post={post} />
          </Stack>
        ))
      ) : (
        <Stack p={5}>
          <Text fontSize="3xl" fontWeight="bold">
            No results for "{query}"
          </Text>
          <Text color="gray.400">Try searching for something else.</Text>
        </Stack>
      )}
    </>
  )
}
