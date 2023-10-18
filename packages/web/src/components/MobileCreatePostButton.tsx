import * as React from "react"
import { FaRegComment } from "react-icons/fa"
import { FiFeather } from "react-icons/fi"
import { IoMdAdd } from "react-icons/io"
import { Box, Icon, IconButton } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { MOBILE_BOTTOM_TAB_HEIGHT } from "./MobileBottomTabs"

export function MobileCreatePostButton() {
  const router = useRouter()
  const isReplying = router.asPath.includes("/posts/")
  const postId = router.query.postId as string

  return (
    <Box position="fixed" bottom={MOBILE_BOTTOM_TAB_HEIGHT + "px"} right={0} m={4}>
      <NextLink href={isReplying && postId ? `/replies/new?postId=${postId}` : "/posts/new"}>
        <Box position="relative">
          <IconButton
            aria-label="post"
            icon={<Box as={isReplying ? FaRegComment : FiFeather} boxSize="22px" color="white" />}
            variant="solid"
            boxSize="50px"
            bg="primary.500"
            _hover={{ bg: "primary.700" }}
          />
          {!isReplying && (
            <Icon
              as={IoMdAdd}
              color="white"
              position="absolute"
              zIndex={1}
              left="11px"
              top="9px"
              boxSize="12px"
              sx={{ path: { "stroke-width": "20px" } }}
            />
          )}
        </Box>
      </NextLink>
    </Box>
  )
}
