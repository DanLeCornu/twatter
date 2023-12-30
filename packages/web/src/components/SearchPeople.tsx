import * as React from "react"
import { Avatar, HStack, Stack, Text } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { QueryMode, useGetSearchUsersQuery } from "lib/graphql"

import { FollowButton } from "./FollowButton"

interface Props {
  search: string
}

export function SearchPeople({ search }: Props) {
  const router = useRouter()
  const query = router.query.q as string

  const { data, loading } = useGetSearchUsersQuery({
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
  const users = data?.users.items || []

  if (loading) return null

  return (
    <>
      {users.length === 0 ? (
        <Stack p={5}>
          <Text fontSize="3xl" fontWeight="bold">
            No results for "{query}"
          </Text>
          <Text color="gray.400">Try searching for something else.</Text>
        </Stack>
      ) : (
        <Stack spacing={6}>
          <Text fontWeight="bold" fontSize="xl">
            People
          </Text>
          {users.map((user, i) => (
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
        </Stack>
      )}
    </>
  )
}
