import * as React from "react"
import { BrowserView, MobileView } from "react-device-detect"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { gql } from "@apollo/client"
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"

import { GetMyBookmarksDocument, useClearAllBookmarksMutation } from "lib/graphql"
import { useMutationHandler } from "lib/hooks/useMutationHandler"

import { Modal } from "./Modal"

const _ = gql`
  mutation ClearAllBookmarks {
    clearAllBookmarks
  }
`

export function BookmarksMenu() {
  const menuProps = useDisclosure()
  const modalProps = useDisclosure()
  const drawerProps = useDisclosure()
  const handler = useMutationHandler()

  const [clearAll, { loading: clearAllLoading }] = useClearAllBookmarksMutation({
    refetchQueries: [{ query: GetMyBookmarksDocument }],
  })

  const handleClick = () => {
    drawerProps.onClose()
    menuProps.onClose()
    modalProps.onOpen()
  }

  const handleClearAllBookmarks = () => {
    return handler(() => clearAll(), {
      onSuccess: () => {
        modalProps.onClose()
      },
    })
  }

  const drawerBg = useColorModeValue("white", "brand.bgDark")

  return (
    <>
      <MobileView>
        <IconButton
          aria-label="open menu"
          variant="ghost"
          boxSize="35px"
          minW="35px" // needed otherwise Chakra default styling overrides and makes it wider
          icon={<Box as={HiOutlineDotsHorizontal} boxSize="20px" />}
          onClick={drawerProps.onOpen}
        />
        <Drawer {...drawerProps} placement="bottom" trapFocus={false}>
          <DrawerOverlay />
          <DrawerContent bg={drawerBg}>
            <DrawerBody p={4}>
              <Stack spacing={5}>
                {/* CLEAR ALL */}
                <HStack spacing={3} onClick={handleClick}>
                  <Text color="red.500" fontWeight="bold">
                    Clear all Bookmarks
                  </Text>
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
        <Menu {...menuProps}>
          <MenuButton
            as={IconButton}
            variant="ghost"
            boxSize="35px"
            minW="35px" // needed otherwise Chakra default styling overrides and makes it wider
            icon={<Box as={HiOutlineDotsHorizontal} boxSize="20px" />}
            onClick={menuProps.onToggle}
          />
          <Portal>
            <MenuList p={0}>
              <MenuItem fontWeight="bold" color="red.500" py={2} onClick={handleClick}>
                Clear all bookmarks
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </BrowserView>

      {/* CLEAR BOOKMARKS MODAL */}
      <Modal {...modalProps} title="Clear all Bookmarks?">
        <Text mb={6}>
          This can't be undone and you'll remove all the posts you've added to your Bookmarks
        </Text>
        <Stack>
          <Button
            bg="red.500"
            onClick={handleClearAllBookmarks}
            _hover={{ bg: "red.500" }}
            isLoading={clearAllLoading}
          >
            Clear
          </Button>
          <Button colorScheme="monochrome" variant="outline" onClick={modalProps.onClose}>
            Cancel
          </Button>
        </Stack>
      </Modal>
    </>
  )
}
