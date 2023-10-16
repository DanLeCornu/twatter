import * as React from "react"
import { BiMoon, BiSun, BiUser } from "react-icons/bi"
import { FiBookmark, FiLogOut, FiSettings } from "react-icons/fi"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Icon,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import NextLink from "next/link"
import logout from "pages/logout"

import { useMe } from "lib/hooks/useMe"

export function MobileTopBarAvatar() {
  const { me } = useMe()
  const drawerProps = useDisclosure()
  const drawerBg = useColorModeValue("white", "brand.bgDark")
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === "dark"

  return (
    <>
      <Avatar src={me?.avatar || undefined} boxSize="30px" onClick={drawerProps.onOpen} zIndex={1} />
      <Drawer {...drawerProps} placement="left" trapFocus={false}>
        <DrawerOverlay />
        <DrawerContent bg={drawerBg}>
          <DrawerBody pl={4} pt={4}>
            <Stack spacing={4}>
              <NextLink href={`/${me?.handle}`}>
                <Stack spacing={0} onClick={drawerProps.onClose}>
                  <Avatar src={me?.avatar || undefined} boxSize="38px" />
                  <Text fontWeight="medium">{me?.name}</Text>
                  <Text color="gray.400" fontSize="sm">
                    @{me?.handle}
                  </Text>
                </Stack>
              </NextLink>

              <HStack spacing={6} py={1}>
                <NextLink href={`/${me?.handle}/following`}>
                  <Button variant="link" fontWeight="sm" size="sm" onClick={drawerProps.onClose}>
                    <HStack spacing={1}>
                      <Text fontWeight="bold">{me?.followingCount.toLocaleString()}</Text>
                      <Text color="gray.400">Following</Text>
                    </HStack>
                  </Button>
                </NextLink>
                <NextLink href={`/${me?.handle}/followers`}>
                  <Button variant="link" fontWeight="sm" size="sm" onClick={drawerProps.onClose}>
                    <HStack spacing={1}>
                      <Text fontWeight="bold">{me?.followerCount.toLocaleString()}</Text>
                      <Text color="gray.400">Followers</Text>
                    </HStack>
                  </Button>
                </NextLink>
              </HStack>
              <NextLink href={`/${me?.handle}`}>
                <HStack spacing={5} py={1} onClick={drawerProps.onClose}>
                  <Icon as={BiUser} boxSize="25px" />
                  <Text fontWeight="bold" fontSize="xl">
                    Profile
                  </Text>
                </HStack>
              </NextLink>
              <NextLink href="/bookmarks">
                <HStack spacing={5} py={1} onClick={drawerProps.onClose}>
                  <Icon as={FiBookmark} boxSize="25px" />
                  <Text fontWeight="bold" fontSize="xl">
                    Bookmarks
                  </Text>
                </HStack>
              </NextLink>
              <Divider />
              <Accordion allowMultiple allowToggle>
                <AccordionItem border="none">
                  {({ isExpanded }) => (
                    <>
                      <h2>
                        <AccordionButton pl={1}>
                          <Text flex={1} textAlign="left" fontWeight="bold" fontSize="sm">
                            Settings and Support
                          </Text>
                          <AccordionIcon color={isExpanded ? "brand.blue" : undefined} />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pl={1}>
                        <Stack spacing={4}>
                          <NextLink href="/settings">
                            <HStack spacing={3} onClick={drawerProps.onClose}>
                              <Icon as={FiSettings} boxSize="15px" />
                              <Text fontWeight="medium" fontSize="sm">
                                Settings and privacy
                              </Text>
                            </HStack>
                          </NextLink>
                          <HStack spacing={3} onClick={toggleColorMode}>
                            <Icon as={isDark ? BiSun : BiMoon} boxSize="15px" />
                            <Text fontWeight="medium" fontSize="sm">
                              Toggle theme
                            </Text>
                          </HStack>
                          <HStack spacing={3} onClick={logout}>
                            <Icon as={FiLogOut} boxSize="15px" />
                            <Text fontWeight="medium" fontSize="sm">
                              Log out
                            </Text>
                          </HStack>
                        </Stack>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
