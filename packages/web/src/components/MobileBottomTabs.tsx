import * as React from "react"
import { BiBell, BiHomeCircle, BiSearch } from "react-icons/bi"
import { FiMail } from "react-icons/fi"
import { Box, HStack, IconButton, useColorModeValue } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"

export const MOBILE_BOTTOM_TAB_HEIGHT = 50

export function MobileBottomTabs() {
  const { asPath } = useRouter()
  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)
  const borderColor = useColorModeValue("gray.100", "gray.700")

  return (
    <HStack
      position="fixed"
      bottom={0}
      left={0}
      h={MOBILE_BOTTOM_TAB_HEIGHT + "px"}
      w="100%"
      zIndex={1}
      px={6}
      py={1}
      bg={bgColor}
      backdropFilter="blur(10px)"
      borderTop="1px"
      borderColor={borderColor}
      justify="space-between"
    >
      <NextLink href="/home">
        <IconButton
          aria-label="home"
          icon={
            <Box as={BiHomeCircle} boxSize="28px" color={asPath === "/home" ? "primary.500" : undefined} />
          }
          variant="ghost"
          boxSize="42px"
        />
      </NextLink>
      <NextLink href="/explore">
        <IconButton
          aria-label="explore"
          icon={
            <Box as={BiSearch} boxSize="25px" color={asPath === "/explore" ? "primary.500" : undefined} />
          }
          variant="ghost"
          boxSize="42px"
        />
      </NextLink>
      <NextLink href="/notifications">
        <IconButton
          aria-label="notifications"
          icon={
            <Box as={BiBell} boxSize="25px" color={asPath === "/notifications" ? "primary.500" : undefined} />
          }
          variant="ghost"
          boxSize="42px"
        />
      </NextLink>
      <NextLink href="/messages">
        <IconButton
          aria-label="messages"
          icon={<Box as={FiMail} boxSize="25px" color={asPath === "/messages" ? "primary.500" : undefined} />}
          variant="ghost"
          boxSize="42px"
        />
      </NextLink>
    </HStack>
  )
}
