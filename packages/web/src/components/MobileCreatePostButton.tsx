import * as React from "react"
import NextLink from "next/link"
import { Box, Icon, IconButton } from "@chakra-ui/react"
import { FiFeather } from "react-icons/fi"
// import { GrFormAdd } from "react-icons/gr"
import { MOBILE_BOTTOM_TAB_HEIGHT } from "./MobileBottomTabs"
import { IoMdAdd } from "react-icons/io"

export function MobileCreatePostButton() {
  return (
    <Box position="fixed" bottom={MOBILE_BOTTOM_TAB_HEIGHT + "px"} right={0} m={4}>
      <NextLink href="/posts/new">
        <Box position="relative">
          <IconButton
            aria-label="post"
            icon={<Box as={FiFeather} boxSize="22px" color="white" />}
            variant="solid"
            boxSize="50px"
            bg="primary.500"
            _hover={{ bg: "primary.700" }}
          />
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
        </Box>
      </NextLink>
    </Box>
  )
}
