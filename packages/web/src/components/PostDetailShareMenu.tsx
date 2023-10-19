import * as React from "react"
import { BrowserView, MobileView } from "react-device-detect"
import { AiOutlineLink } from "react-icons/ai"
import { FiMail, FiShare } from "react-icons/fi"
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
  useDisclosure,
} from "@chakra-ui/react"

import { WEB_URL } from "lib/config"
import { useToast } from "lib/hooks/useToast"

interface Props {
  postId: string
}

export function PostDetailShareMenu({ postId }: Props) {
  const toast = useToast()
  const drawerProps = useDisclosure()
  const { onCopy } = useClipboard(`${WEB_URL}/posts/${postId}`)

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
          aria-label="open share menu"
          variant="ghost"
          color="gray"
          _hover={{ color: "primary.500" }}
          icon={<Box as={FiShare} boxSize="22px" />}
          onClick={drawerProps.onOpen}
        />
        <Drawer {...drawerProps} placement="bottom" trapFocus={false}>
          <DrawerOverlay />
          <DrawerContent bg={drawerBg}>
            <DrawerBody p={4}>
              <Stack spacing={5}>
                {/* COPY */}
                <HStack spacing={3} onClick={handleCopy}>
                  <Icon as={AiOutlineLink} boxSize="18px" />
                  <Text fontWeight="bold">Copy link</Text>
                </HStack>
                {/* SEND VIA DM */}
                <HStack spacing={3} onClick={() => console.log("share via dm click")}>
                  <Icon as={FiMail} boxSize="18px" />
                  <Text fontWeight="bold">Send via Direct Message</Text>
                </HStack>

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
            variant="ghost"
            color="gray"
            _hover={{ color: "primary.500" }}
            icon={<Box as={FiShare} boxSize="22px" />}
          />
          <Portal>
            <MenuList onClick={(e) => e.stopPropagation()}>
              {/* COPY */}
              <MenuItem
                icon={<Box as={AiOutlineLink} boxSize="18px" />}
                fontWeight="medium"
                onClick={handleCopy}
              >
                Copy link
              </MenuItem>
              {/* SEND VIA DM */}
              <MenuItem
                icon={<Box as={FiMail} boxSize="18px" />}
                fontWeight="medium"
                // onClick={() => {
                // stuff
                // }}
              >
                Send via Direct Message
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </BrowserView>
    </>
  )
}
