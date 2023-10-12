import {
  Avatar,
  Box,
  Text,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useColorModeValue,
  useDisclosure,
  HStack,
  Button,
  Icon,
  Stack,
  Divider,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  useColorMode,
} from "@chakra-ui/react"
import { useMe } from "lib/hooks/useMe"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { TOTAL_HEADER_HEIGHT } from "pages/home"
import * as React from "react"
import NextLink from "next/link"
import { BiMoon, BiSun, BiUser } from "react-icons/bi"
import { FiBookmark, FiLogOut, FiSettings } from "react-icons/fi"
import { useLogout } from "lib/hooks/useLogout"

export const HEADING_CONTAINER_HEIGHT = 50

export function MobileTopBar() {
  const { me } = useMe()
  const logout = useLogout()
  const drawerProps = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)
  const drawerBg = useColorModeValue("white", "brand.bgDark")

  const isDark = colorMode === "dark"
  return (
    <>
      {/* Underlay that provides blurred background */}
      <Box
        position="fixed"
        left={0}
        top={0}
        h={TOTAL_HEADER_HEIGHT}
        w="100%"
        backdropFilter="blur(10px)"
        bg={bgColor}
        zIndex={1}
      />
      <Box position="fixed" top={0} left={0} h={HEADING_CONTAINER_HEIGHT} zIndex={1}>
        <Avatar mt={3} ml={4} src={me?.avatar || undefined} boxSize="30px" onClick={drawerProps.onOpen} />
      </Box>
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
