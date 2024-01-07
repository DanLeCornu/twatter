import * as React from "react"
import { BrowserView, MobileView } from "react-device-detect"
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Stack,
  Text,
  useClipboard,
  useColorModeValue,
} from "@chakra-ui/react"
import { Ban, CircleSlash, Flag, Link2, MoreHorizontal, Volume2, VolumeX } from "lucide-react"
import NextLink from "next/link"

import { WEB_URL } from "lib/config"
import { useToast } from "lib/hooks/useToast"

export type DisclosureProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
  isControlled: boolean
  getButtonProps: (props?: any) => any
  getDisclosureProps: (props?: any) => any
}

interface Props {
  isMuted: boolean
  isBlocked: boolean
  handle: string
  onOpen: () => void
  handleMute: () => void
  handleUnmute: () => void
  drawerProps: DisclosureProps
}

export function ProfileMenu({
  isMuted,
  isBlocked,
  handle,
  onOpen,
  handleMute,
  handleUnmute,
  drawerProps,
}: Props) {
  const toast = useToast()

  const { onCopy } = useClipboard(`${WEB_URL}/${handle}`)

  const handleCopy = () => {
    onCopy()
    toast({ description: "Copied to clipboard" })
    drawerProps.onClose()
  }

  const drawerBg = useColorModeValue("white", "brand.bgDark")

  return (
    <>
      <MobileView>
        <IconButton
          aria-label="open menu"
          variant="outline"
          minW="34px"
          boxSize="34px"
          icon={<Box as={MoreHorizontal} boxSize="20px" color="gray.200" />}
          onClick={drawerProps.onOpen}
        />
        <Drawer {...drawerProps} placement="bottom" trapFocus={false}>
          <DrawerOverlay />
          <DrawerContent bg={drawerBg}>
            <DrawerBody p={4}>
              <Stack spacing={5}>
                {!isBlocked && (
                  <>
                    {/* COPY */}
                    <HStack spacing={3} onClick={handleCopy}>
                      <Icon as={Link2} boxSize="18px" />
                      <Text fontWeight="bold">Copy link to profile</Text>
                    </HStack>
                    {/* MUTE */}
                    <HStack spacing={3} onClick={isMuted ? handleUnmute : handleMute}>
                      <Icon as={isMuted ? Volume2 : VolumeX} boxSize="18px" />
                      <Text fontWeight="bold">{`${isMuted ? "Unmute" : "Mute"} @${handle}`}</Text>
                    </HStack>
                  </>
                )}
                {/* BLOCK */}
                <HStack spacing={3} onClick={onOpen}>
                  <Icon as={isBlocked ? CircleSlash : Ban} boxSize="18px" />
                  <Text fontWeight="bold">{`${isBlocked ? "Unblock" : "Block"} @${handle}`}</Text>
                </HStack>
                {/* REPORT */}
                <NextLink href={`/${handle}/report`}>
                  <HStack spacing={3}>
                    <Icon as={Flag} boxSize="18px" />
                    <Text fontWeight="bold">Report @{handle}</Text>
                  </HStack>
                </NextLink>

                <Button variant="outline" colorScheme="monochrome" onClick={drawerProps.onClose}>
                  Cancel
                </Button>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </MobileView>
      <BrowserView>
        <Menu placement="bottom">
          <MenuButton
            as={IconButton}
            icon={<Box as={MoreHorizontal} boxSize="20px" color="gray.200" />}
            variant="outline"
            minW="34px"
            boxSize="34px"
          />
          <Portal>
            <MenuList onClick={(e) => e.stopPropagation()}>
              {!isBlocked && (
                <>
                  {/* COPY */}
                  <MenuItem icon={<Box as={Link2} boxSize="18px" />} fontWeight="medium" onClick={handleCopy}>
                    Copy link to profile
                  </MenuItem>
                  {/* MUTE */}
                  <MenuItem
                    icon={<Box as={isMuted ? Volume2 : VolumeX} boxSize="18px" />}
                    fontWeight="medium"
                    onClick={isMuted ? handleUnmute : handleMute}
                  >
                    {`${isMuted ? "Unmute" : "Mute"} @${handle}`}
                  </MenuItem>
                </>
              )}
              {/* BLOCK */}
              <MenuItem
                icon={<Box as={isBlocked ? CircleSlash : Ban} boxSize="18px" />}
                fontWeight="medium"
                onClick={onOpen}
              >
                {`${isBlocked ? "Unblock" : "Block"} @${handle}`}
              </MenuItem>
              {/* REPORT */}
              <NextLink href={`/${handle}/report`}>
                <MenuItem icon={<Box as={Flag} boxSize="18px" />} fontWeight="medium">
                  Report @{handle}
                </MenuItem>
              </NextLink>
            </MenuList>
          </Portal>
        </Menu>
      </BrowserView>
    </>
  )
}
