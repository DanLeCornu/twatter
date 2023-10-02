import * as React from "react"
import {
  Box,
  HStack,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react"
import dayjs from "dayjs"
import NextLink from "next/link"

import type { PostItemFragment, ReplyItemFragment } from "lib/graphql"
import { postTimeFromNow } from "lib/helpers/utils"

import { UserPopover } from "./UserPopover"

interface Props {
  type: "post" | "reply"
  item: PostItemFragment | ReplyItemFragment
  noPopover?: boolean
}

export function ItemHeading({ type, item, noPopover = false }: Props) {
  const popoverBg = useColorModeValue("white", "#1A202C")

  return (
    <NextLink href={`/${item.user.handle}`}>
      <HStack spacing={1}>
        {noPopover ? (
          <HStack spacing={1}>
            <Text fontWeight="bold" fontSize="15px" noOfLines={1}>
              {item.user.name}
            </Text>
            <Text
              color="gray.400"
              fontSize="14px"
              noOfLines={1}
              minW="46px" // magic number to fit 3 character handle
            >
              @{item.user.handle}
            </Text>
          </HStack>
        ) : (
          <Popover isLazy trigger="hover" placement="bottom-start" openDelay={500}>
            <PopoverTrigger>
              <HStack spacing={1}>
                <Text
                  fontWeight="bold"
                  _hover={{ textDecoration: "underline" }}
                  fontSize="15px"
                  noOfLines={1}
                >
                  {item.user.name}
                </Text>
                <Text
                  color="gray.400"
                  fontSize="14px"
                  noOfLines={1}
                  minW="46px" // magic number to fit 3 character handle
                >
                  @{item.user.handle}
                </Text>
              </HStack>
            </PopoverTrigger>
            <Portal>
              <PopoverContent bg={popoverBg}>
                <PopoverBody>
                  <UserPopover user={item.user} />
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        )}
        <HStack spacing={1}>
          <Box color="gray.400">&#183;</Box>
          <Tooltip label={dayjs(item.createdAt).format("h:mm A MMM DD YYYY")}>
            {type === "post" ? (
              <NextLink href={`/posts/${item.id}`}>
                <Text
                  color="gray.400"
                  _hover={{ textDecoration: !noPopover ? "underline" : undefined }}
                  fontSize="14px"
                  whiteSpace="nowrap"
                >
                  {postTimeFromNow(item.createdAt)}
                </Text>
              </NextLink>
            ) : (
              <Text
                color="gray.400"
                _hover={{ textDecoration: !noPopover ? "underline" : undefined }}
                fontSize="14px"
                whiteSpace="nowrap"
              >
                {postTimeFromNow(item.createdAt)}
              </Text>
            )}
          </Tooltip>
        </HStack>
      </HStack>
    </NextLink>
  )
}
