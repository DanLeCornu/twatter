import * as React from "react"
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Image,
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
import type { LucideIcon } from "lucide-react"
import {
  Bell,
  Bookmark,
  Feather,
  Home,
  LogOut,
  Mail,
  Moon,
  MoreHorizontal,
  Search,
  Sun,
  User,
} from "lucide-react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { useLogout } from "lib/hooks/useLogout"
import { useMe } from "lib/hooks/useMe"

import { Modal } from "./Modal"

export const DESKTOP_NAV_WIDTH = 68

export function DesktopNav() {
  const { me } = useMe()
  const logout = useLogout()
  const modalProps = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  const isDark = colorMode === "dark"
  const borderColor = useColorModeValue("gray.100", "gray.700")
  const bgColor = useColorModeValue("white", "brand.bgDark")

  return (
    <Flex
      w={{ base: "88px", xl: "275px" }}
      borderRight="1px solid"
      borderColor={borderColor}
      bg={bgColor}
      py={2}
      px={5}
      h="100vh"
      zIndex={1}
      justify="center"
    >
      <Flex justify="space-between" direction="column" w="100%">
        <Flex direction="column">
          <NextLink href="/home">
            <Center boxSize="50px" p="10px" rounded="full" _hover={{ bg: "rgba(255,255,255,0.1)" }}>
              <Image
                alt="twatter logo"
                src={colorMode === "dark" ? "twatter-logo-white.png" : "twatter-logo-black.png"}
              />
            </Center>
          </NextLink>
          <Stack mb={2}>
            <NavItem href="/home" pathnames={["/home"]} icon={Home} text="Home" />
            <NavItem href="/explore" pathnames={["/explore", "/search"]} icon={Search} text="Explore" />
            <NavItem href="/notifications" pathnames={["/notifications"]} icon={Bell} text="Notifications" />
            <NavItem href="/messages" pathnames={["/messages"]} icon={Mail} text="Messages" />
            <NavItem href={`/${me?.handle}`} pathnames={["/[handle]"]} icon={User} text="Profile" />
            <Menu placement="bottom-end">
              <MenuButton
                as={Button}
                variant="ghost"
                leftIcon={
                  <Box as={MoreHorizontal} boxSize="24px" border="2px" rounded="full" p="0.5px" m={0} />
                }
                pl={3.5}
                h="50px"
              >
                <Text
                  fontSize="xl"
                  fontWeight="medium"
                  textAlign="left"
                  ml={3}
                  display={{ base: "none", xl: "flex" }}
                >
                  More
                </Text>
              </MenuButton>
              <Portal>
                <MenuList>
                  <NextLink href="/bookmarks">
                    <MenuItem icon={<Box as={Bookmark} boxSize="25px" />} fontSize="xl">
                      Bookmarks
                    </MenuItem>
                  </NextLink>
                  <MenuItem
                    closeOnSelect={false}
                    icon={<Box as={isDark ? Sun : Moon} boxSize="25px" />}
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
              icon={<Box as={Feather} boxSize="25px" color="white" />}
              variant="solid"
              boxSize="50px"
              bg="primary.500"
              _hover={{ bg: "primary.700" }}
              display={{ base: "flex", xl: "none" }}
            />
            <Button size="lg" w="100%" mt={4} display={{ base: "none", xl: "flex" }}>
              Post
            </Button>
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
                icon={<Box as={LogOut} boxSize="18px" />}
                fontWeight="medium"
                onClick={modalProps.onOpen}
              >
                Log out @{me?.handle}
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
        {/* LOGOUT MODAL */}
        <Modal
          {...modalProps}
          title="Log out of Twatter?"
          image={colorMode === "dark" ? "twatter-logo-white.png" : "twatter-logo-black.png"}
        >
          <Text mb={6}>You can always log back in at any time.</Text>
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

interface Props {
  href: string
  pathnames: string[]
  icon: LucideIcon
  text: string
}

function NavItem({ href, pathnames, icon, text }: Props) {
  const { pathname } = useRouter()
  const isActive = pathnames.includes(pathname)
  return (
    <NextLink href={href}>
      <HStack rounded="full" _hover={{ bg: "rgba(255,255,255,0.1)" }} pr={4}>
        <IconButton
          aria-label={text}
          icon={<Box as={icon} boxSize="24px" strokeWidth={isActive ? "3px" : undefined} />}
          variant="unstyled"
          boxSize="50px"
          p={3}
        />
        <Text fontSize="xl" fontWeight={isActive ? "bold" : "medium"} display={{ base: "none", xl: "flex" }}>
          {text}
        </Text>
      </HStack>
    </NextLink>
  )
}
