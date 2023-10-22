import * as React from "react"
import { Avatar, HStack, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import NextLink from "next/link"

import type { UserSearchItemFragment } from "lib/graphql"

interface Props {
  user: UserSearchItemFragment
  size?: "big" | "small"
  path?: string
}

export function UserSearchItem({ user, size = "big", path }: Props) {
  const bgHover = useColorModeValue("gray.50", "#182234")
  return (
    <NextLink href={path ? path : `/${user.handle}`}>
      <HStack _hover={{ bg: bgHover }} px={4} py={size === "big" ? 4 : 2}>
        <Avatar src={user.avatar || undefined} boxSize="40px" />
        <Stack spacing={0} w="100%">
          <Text fontWeight="bold" fontSize={size === "big" ? "md" : "sm"} isTruncated w="80%">
            {user.name}
          </Text>
          <Text color="gray.400" fontSize="sm">
            @{user.handle}
          </Text>
        </Stack>
      </HStack>
    </NextLink>
  )
}
