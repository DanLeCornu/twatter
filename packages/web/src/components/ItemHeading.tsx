import * as React from "react"
import {
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
  item: PostItemFragment | ReplyItemFragment
  noPopover?: boolean
}

export function ItemHeading({ item, noPopover = false }: Props) {
  const popoverBg = useColorModeValue("white", "#1A202C")

  return (
    <NextLink href={`/${item.user.handle}`}>
      <HStack spacing={1}>
        <Popover
          isLazy
          trigger="hover"
          placement="bottom-start"
          openDelay={500}
          isOpen={noPopover ? false : undefined}
        >
          <PopoverTrigger>
            <Text
              fontSize="15px"
              fontWeight="bold"
              minW="32px" // magic number to ensure at least 3 letters of the name always gets shown
              isTruncated
            >
              {item.user.name}
            </Text>
          </PopoverTrigger>
          <Portal>
            <PopoverContent bg={popoverBg}>
              <PopoverBody>
                <UserPopover user={item.user} />
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
        <Popover
          isLazy
          trigger="hover"
          placement="bottom-start"
          openDelay={500}
          isOpen={noPopover ? false : undefined}
        >
          <PopoverTrigger>
            <Text fontSize="14px" color="gray.400" isTruncated>
              @{item.user.handle}
            </Text>
          </PopoverTrigger>
          <Portal>
            <PopoverContent bg={popoverBg}>
              <PopoverBody>
                <UserPopover user={item.user} />
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
        <Tooltip label={dayjs(item.createdAt).format("h:mm A MMM DD YYYY")}>
          <Text fontSize="14px" color="gray.400" flexShrink={0}>
            <Text as="span" mr={1}>
              &#183;
            </Text>
            {postTimeFromNow(item.createdAt)}
          </Text>
        </Tooltip>
      </HStack>
    </NextLink>
  )
}
