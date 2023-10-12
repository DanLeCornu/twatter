import * as React from "react"
import { Avatar, HStack, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import NextLink from "next/link"

import type { UserSearchItemFragment } from "lib/graphql"

interface Props {
  users: UserSearchItemFragment[]
}

export function ExploreUserList({ users }: Props) {
  const bgHover = useColorModeValue("gray.50", "#182234")
  return (
    <>
      {users.map((user, i) => (
        <NextLink key={i} href={`/${user.handle}`}>
          <HStack _hover={{ bg: bgHover }} p={4}>
            <Avatar src={user.avatar || undefined} boxSize="40px" />
            <Stack spacing={-1}>
              <Text fontWeight="bold" isTruncated w="100%">
                {user.name}
              </Text>
              <Text color="gray.400" fontSize="sm">
                @{user.handle}
              </Text>
            </Stack>
          </HStack>
        </NextLink>
      ))}
    </>
  )
}
