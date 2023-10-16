import * as React from "react"
import { Box, Flex, Link, Text } from "@chakra-ui/react"
import NextLink from "next/link"

import { MOBILE_BOTTOM_TAB_HEIGHT } from "./MobileBottomTabs"

interface Props {
  description?: React.ReactNode
  link?: string
  linkText?: string
  action?: React.ReactNode
  onClose?: () => void
}

export function CustomToast({ description, link, linkText, action, onClose }: Props) {
  return (
    <Box
      w="100vw"
      bg="brand.blue"
      position="absolute"
      left={0}
      bottom={MOBILE_BOTTOM_TAB_HEIGHT + "px"}
      px={5}
      py={2}
    >
      <Flex justify="space-between" align="center">
        <Text color="white" fontSize="14px">
          {description}
        </Text>
        {link && linkText ? (
          <NextLink href={link}>
            <Link href={link}>
              <Text fontWeight="medium" color="white" fontSize="sm">
                {linkText}
              </Text>
            </Link>
          </NextLink>
        ) : (
          <Box onClick={onClose}>{action}</Box>
        )}
      </Flex>
    </Box>
  )
}
