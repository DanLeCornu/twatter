import * as React from "react"
import { Avatar, Box, HStack, Stack, Text } from "@chakra-ui/react"
import NextLink from "next/link"

import type { UserFollowItemFragment } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"

import { FollowButton } from "./FollowButton"

interface Props {
  followers: UserFollowItemFragment[]
}

export function FollowerList({ followers }: Props) {
  const { me } = useMe()
  return (
    <Box>
      {followers.map((follower) => (
        <Stack key={follower.id} p={4}>
          <HStack justify="space-between">
            <NextLink href={`/${follower.handle}`}>
              <HStack spacing={3}>
                <Avatar src={follower.avatar || undefined} boxSize="40px" />
                <Stack spacing={0}>
                  <Text
                    fontSize="sm"
                    fontWeight="bold"
                    _hover={{ textDecoration: "underline" }}
                    noOfLines={1}
                  >
                    {follower.name}
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    @{follower.handle}
                  </Text>
                </Stack>
              </HStack>
            </NextLink>

            {follower.id !== me?.id && (
              <Box>
                <FollowButton userId={follower.id} handle={follower.handle} defaultShowFollowing />
              </Box>
            )}
          </HStack>
          <Text fontSize="sm" pl="52px">
            {follower.bio}
          </Text>
        </Stack>
      ))}
    </Box>
  )
}
