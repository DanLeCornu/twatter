import * as React from "react"
import { Avatar, Box, HStack, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import NextLink from "next/link"

import type { MessageUserSearchItemFragment } from "lib/graphql"
import { AllowMessagesFrom } from "lib/graphql"

interface Props {
  user: MessageUserSearchItemFragment
  followerIds: string[]
}

export function MessageUserSearchItem({ user, followerIds }: Props) {
  const bgHover = useColorModeValue("gray.50", "#182234")
  const followsMe = followerIds.includes(user.id)
  const isDisabled = !followsMe && user.allowMessagesFrom === AllowMessagesFrom.NoOne
  return (
    <>
      {isDisabled ? (
        <HStack px={4} py={2}>
          <Box position="relative">
            <Box
              position="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              bg="rgba(0,0,0,0.5)"
              zIndex={1}
              rounded="full"
            />
            <Avatar src={user.avatar || undefined} boxSize="40px" />
          </Box>
          <Stack spacing={0} w="100%">
            <Text fontWeight="bold" fontSize="sm" isTruncated w="80%" color="#7A8087">
              {user.name}
            </Text>
            <Text color="gray.600" fontSize="sm">
              @{user.handle} can't be messaged
            </Text>
          </Stack>
        </HStack>
      ) : (
        <NextLink href={`/messages/${user.id}?newConversation=true`}>
          <HStack _hover={{ bg: bgHover }} px={4} py={2}>
            <Avatar src={user.avatar || undefined} boxSize="40px" />
            <Stack spacing={0} w="100%">
              <Text fontWeight="bold" fontSize="sm" isTruncated w="80%">
                {user.name}
              </Text>
              <Text color="gray.400" fontSize="sm">
                @{user.handle}
              </Text>
            </Stack>
          </HStack>
        </NextLink>
      )}
    </>
  )
}
