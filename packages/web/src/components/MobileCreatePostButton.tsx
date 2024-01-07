import * as React from "react"
import { Box, Icon, IconButton } from "@chakra-ui/react"
import { Feather, Mail, MessageCircle, Plus } from "lucide-react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { MOBILE_BOTTOM_TAB_HEIGHT } from "./MobileBottomTabs"

export function MobileCreatePostButton() {
  const router = useRouter()
  const isReplying = router.asPath.includes("/posts/")
  const isMessaging = router.asPath === "/messages"
  const postId = router.query.postId as string

  return (
    <Box position="fixed" bottom={MOBILE_BOTTOM_TAB_HEIGHT + "px"} right={0} m={4}>
      <NextLink
        href={
          isReplying && postId
            ? `/replies/new?postId=${postId}`
            : isMessaging
            ? "/messages/new"
            : "/posts/new"
        }
      >
        <Box position="relative">
          <IconButton
            aria-label="post"
            icon={
              <Box
                as={isReplying ? MessageCircle : isMessaging ? Mail : Feather}
                boxSize="22px"
                color="white"
              />
            }
            variant="solid"
            boxSize="50px"
            bg="primary.500"
            _hover={{ bg: "primary.700" }}
          />
          {isMessaging && (
            <Icon
              as={Plus}
              color="white"
              position="absolute"
              zIndex={1}
              left="28px"
              top="27px"
              boxSize="12px"
              bg="brand.blue"
              sx={{ path: { "stroke-width": "20px" } }}
            />
          )}
          {!isReplying && !isMessaging && (
            <Icon
              as={Plus}
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
