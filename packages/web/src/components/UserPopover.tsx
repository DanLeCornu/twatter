import * as React from "react"
import { Avatar, Button, HStack, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import NextLink from "next/link"

import type { UserDetailFragment } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"

import { FollowButton } from "./FollowButton"

interface PostItemUserProps {
  user: UserDetailFragment
}

export function UserPopover({ user }: PostItemUserProps) {
  const { me } = useMe()
  const handleColor = useColorModeValue("gray.400", "gray.500")

  return (
    <Stack p={2} onClick={(e) => e.stopPropagation()}>
      <HStack align="flex-start" justify="space-between">
        <Avatar src={user.avatar || undefined} boxSize="60px" />
        {user.id !== me?.id && <FollowButton userId={user.id} defaultShowFollowing />}
      </HStack>
      <Stack spacing={0}>
        <Text fontWeight="bold">{user.name}</Text>
        <Text color={handleColor}>@{user.handle}</Text>
      </Stack>
      <Text>{user.bio}</Text>
      <HStack spacing={6}>
        <NextLink href={`/${user.handle}/following`}>
          <Button variant="link" fontWeight="sm" size="sm">
            <HStack spacing={1}>
              <Text fontWeight="bold">{user.followingCount.toLocaleString()}</Text>
              <Text color={handleColor}>Following</Text>
            </HStack>
          </Button>
        </NextLink>
        <NextLink href={`/${user.handle}/followers`}>
          <Button variant="link" fontWeight="sm" size="sm">
            <HStack spacing={1}>
              <Text fontWeight="bold">{user.followerCount.toLocaleString()}</Text>
              <Text color={handleColor}>Followers</Text>
            </HStack>
          </Button>
        </NextLink>
      </HStack>
    </Stack>
  )
}
