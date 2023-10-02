import * as React from "react"
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import NextLink from "next/link"

import type { ReplyItemFragment } from "lib/graphql"

import { ItemHeading } from "./ItemHeading"
import { ItemMenu } from "./ItemMenu"
import { UserPopover } from "./UserPopover"

interface Props {
  reply: ReplyItemFragment
}

export function ReplyItem({ reply }: Props) {
  const borderColor = useColorModeValue("gray.100", "gray.700")
  const bgHover = useColorModeValue("gray.50", "#182234")
  const popoverBg = useColorModeValue("white", "#1A202C")
  return (
    <Box
      key={reply.id}
      borderBottom="1px solid"
      borderColor={borderColor}
      _hover={{ bg: bgHover }}
      pt={3}
      pb={1}
      pl={4}
      pr={1}
    >
      <Flex align="flex-start">
        <Popover isLazy trigger="hover" placement="bottom-start">
          <PopoverTrigger>
            <NextLink href={`/${reply.user.handle}`}>
              <Avatar src={reply.user.avatar || undefined} boxSize="40px" />
            </NextLink>
          </PopoverTrigger>
          <PopoverContent bg={popoverBg}>
            <PopoverArrow />
            <PopoverBody>
              <UserPopover user={reply.user} />
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Stack pl={2} spacing={0} w="calc(100% - 40px)">
          <HStack justify="space-between" spacing={0} h="24px">
            <Box w="calc(100% - 35px)">
              <ItemHeading item={reply} type="reply" />
            </Box>
            <ItemMenu item={reply} />
          </HStack>
          <Text fontSize="sm">{reply.text}</Text>
        </Stack>
      </Flex>
    </Box>
  )
}
