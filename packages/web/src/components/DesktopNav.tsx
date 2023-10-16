import * as React from "react"
import { AiOutlineTwitter } from "react-icons/ai"
import { BiBell, BiHomeCircle, BiMoon, BiSearch, BiSun, BiUser } from "react-icons/bi"
import { FiBookmark, FiFeather, FiLogOut, FiMail } from "react-icons/fi"
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi"
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { useLogout } from "lib/hooks/useLogout"
import { useMe } from "lib/hooks/useMe"

import { Modal } from "./Modal"

export const DESKTOP_NAV_WIDTH = 68

export function DesktopNav() {
  const { me } = useMe()
  const logout = useLogout()
  const { asPath } = useRouter()
  const modalProps = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  const isDark = colorMode === "dark"
  const borderColor = useColorModeValue("gray.100", "gray.700")
  const bgColor = useColorModeValue("white", "brand.bgDark")

  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      w={DESKTOP_NAV_WIDTH + "px"}
      borderRight="1px solid"
      borderColor={borderColor}
      bg={bgColor}
      p={2}
      h="100vh"
      zIndex={1}
    >
      <Flex justify="space-between" direction="column">
        <Flex direction="column">
          <NextLink href="/home">
            <IconButton
              aria-label="twatter logo"
              icon={<Box as={AiOutlineTwitter} boxSize="30px" />}
              variant="ghost"
              boxSize="50px"
              mb={1}
            />
          </NextLink>
          <Stack spacing={0} mb={2}>
            <NextLink href="/home">
              <IconButton
                aria-label="home"
                icon={
                  <Box
                    as={BiHomeCircle}
                    boxSize="28px"
                    color={asPath === "/home" ? "primary.500" : undefined}
                  />
                }
                variant="ghost"
                boxSize="50px"
              />
            </NextLink>
            <NextLink href="/explore">
              <IconButton
                aria-label="explore"
                icon={
                  <Box
                    as={BiSearch}
                    boxSize="25px"
                    color={asPath === "/explore" ? "primary.500" : undefined}
                  />
                }
                variant="ghost"
                boxSize="50px"
              />
            </NextLink>
            <NextLink href="/notifications">
              <IconButton
                aria-label="notifications"
                icon={
                  <Box
                    as={BiBell}
                    boxSize="25px"
                    color={asPath === "/notifications" ? "primary.500" : undefined}
                  />
                }
                variant="ghost"
                boxSize="50px"
              />
            </NextLink>
            <NextLink href="/messages">
              <IconButton
                aria-label="messages"
                icon={
                  <Box
                    as={FiMail}
                    boxSize="25px"
                    color={asPath === "/messages" ? "primary.500" : undefined}
                  />
                }
                variant="ghost"
                boxSize="50px"
              />
            </NextLink>
            <NextLink href={`/${me?.handle}`}>
              <IconButton
                aria-label="profile"
                icon={
                  <Box
                    as={BiUser}
                    boxSize="25px"
                    color={asPath.includes(`/${me?.handle}`) ? "primary.500" : undefined}
                  />
                }
                variant="ghost"
                boxSize="50px"
              />
            </NextLink>
            <Menu placement="bottom-end">
              <MenuButton
                as={IconButton}
                variant="ghost"
                boxSize="50px"
                icon={<Box as={HiOutlineDotsCircleHorizontal} boxSize="25px" />}
              />
              <Portal>
                <MenuList>
                  <NextLink href="/bookmarks">
                    <MenuItem icon={<Box as={FiBookmark} boxSize="25px" />} fontSize="xl">
                      Bookmarks
                    </MenuItem>
                  </NextLink>
                  <MenuItem
                    closeOnSelect={false}
                    icon={<Box as={isDark ? BiSun : BiMoon} boxSize="25px" />}
                    fontSize="xl"
                    onClick={toggleColorMode}
                  >
                    Toggle theme
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Stack>
          <NextLink href="/posts/new">
            <IconButton
              aria-label="post"
              icon={<Box as={FiFeather} boxSize="25px" color="white" />}
              variant="solid"
              boxSize="50px"
              bg="primary.500"
              _hover={{ bg: "primary.700" }}
            />
          </NextLink>
        </Flex>
        <Menu placement="top">
          <MenuButton
            as={IconButton}
            variant="ghost"
            boxSize="50px"
            icon={<Avatar src={me?.avatar || undefined} boxSize="40px" />}
          />
          <Portal>
            <MenuList>
              <MenuItem
                closeOnSelect={false}
                icon={<Box as={FiLogOut} boxSize="18px" />}
                fontWeight="medium"
                onClick={modalProps.onOpen}
              >
                Log out @{me?.handle}
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
        <Modal {...modalProps} title="Log out of Twatter?" icon={AiOutlineTwitter}>
          <Text mb={6}>
            You can always log back in at any time. If you just want to switch accounts, you can do that by
            adding an existing account.
          </Text>
          <Stack>
            <Button colorScheme="monochrome" onClick={logout}>
              Log out
            </Button>
            <Button colorScheme="monochrome" variant="outline" onClick={modalProps.onClose}>
              Cancel
            </Button>
          </Stack>
        </Modal>
      </Flex>
    </Flex>
  )
}
