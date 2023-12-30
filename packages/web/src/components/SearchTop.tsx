import * as React from "react"
import { Avatar, Divider, HStack, Link, Stack, Text } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { QueryMode, SortOrder, useGetPostsQuery, useGetSearchUsersQuery } from "lib/graphql"

import { FollowButton } from "./FollowButton"
import { PostItem } from "./PostItem"

interface Props {
  search: string
}

export function SearchTop({ search }: Props) {
  const router = useRouter()
  const query = router.query.q as string

  const { data: userData, loading: usersLoading } = useGetSearchUsersQuery({
    variables: {
      take: 10,
      where: {
        handle: { not: null },
        OR: [
          { name: search ? { contains: search, mode: QueryMode.Insensitive } : undefined },
          { handle: search ? { contains: search, mode: QueryMode.Insensitive } : undefined },
          { bio: search ? { contains: search, mode: QueryMode.Insensitive } : undefined },
        ],
      },
    },
  })
  const { data: postData, loading: postsLoading } = useGetPostsQuery({
    variables: {
      orderBy: { createdAt: SortOrder.Desc },
      where: {
        OR: [{ text: search ? { contains: search, mode: QueryMode.Insensitive } : undefined }],
      },
    },
  })
  const users = userData?.users.items || []
  const posts = postData?.posts.items || []

  if (usersLoading || postsLoading) return null

  return (
    <>
      {users.length === 0 && posts.length === 0 ? (
        <Stack p={5}>
          <Text fontSize="3xl" fontWeight="bold">
            No results for "{query}"
          </Text>
          <Text color="gray.400">Try searching for something else.</Text>
        </Stack>
      ) : (
        <Stack spacing={6}>
          {users.length > 0 ? (
            <>
              <Text fontWeight="bold" fontSize="xl">
                People
              </Text>
              {users.slice(0, 2).map((user, i) => (
                <NextLink key={i} href={`/${user.handle}`}>
                  <HStack align="flex-start" spacing={3}>
                    <Avatar src={user.avatar || undefined} boxSize="38px" />
                    <Stack w="calc(100% - 50px)" spacing={1}>
                      <HStack justify="space-between" align="flex-start">
                        <Stack spacing={0} w="calc(100% - 98px)">
                          <Text fontWeight="bold" isTruncated>
                            {user.name}
                          </Text>
                          <Text color="gray.400" isTruncated>
                            @{user.handle}
                          </Text>
                        </Stack>
                        <FollowButton userId={user.id} handle={user.handle} />
                      </HStack>
                      <Text>{user.bio}</Text>
                    </Stack>
                  </HStack>
                </NextLink>
              ))}
              <Link color="brand.blue" onClick={(e) => e.preventDefault()}>
                <NextLink href={`/search?q=${query}&t=people`}>View all</NextLink>
              </Link>
              {/* TODO styling shuffle to have divider full width */}
              <Divider />
            </>
          ) : null}
          {posts.map((post, i) => (
            <PostItem key={i} post={post} />
          ))}
        </Stack>
      )}
    </>
  )
}
