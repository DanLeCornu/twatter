import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Stack,
  Button,
  Menu,
  Portal,
  MenuList,
  useColorModeValue,
  HStack,
  Text,
  Icon,
  useDisclosure,
  MenuItem,
  Box,
} from "@chakra-ui/react"
import { ConversationItemFragment, useDeleteConversationMutation } from "lib/graphql"
import * as React from "react"
import { MobileView, BrowserView } from "react-device-detect"
import { DisclosureProps } from "./ProfileMenu"
import NextLink from "next/link"
import { BiFlag, BiTrash } from "react-icons/bi"
import { Modal } from "./Modal"
import { gql } from "@apollo/client"
import { useMutationHandler } from "lib/hooks/useMutationHandler"

const _ = gql`
  mutation DeleteConversation($messageIds: [String!]!) {
    deleteConversation(messageIds: $messageIds)
  }
`

interface Props {
  conversation?: ConversationItemFragment
  drawerProps: DisclosureProps
  menuProps: DisclosureProps
}

export function ConversationMenu({ conversation, drawerProps, menuProps }: Props) {
  const modalProps = useDisclosure()
  const handler = useMutationHandler()
  const drawerBg = useColorModeValue("white", "brand.bgDark")

  const [deleteConversation] = useDeleteConversationMutation()

  const handleOpenModal = () => {
    drawerProps.onClose()
    menuProps.onClose()
    modalProps.onOpen()
  }

  const handleDeleteConversation = () => {
    const messageIds = conversation?.messages.map((message) => message.id) || []
    if (messageIds.length === 0) return
    return handler(() => deleteConversation({ variables: { messageIds } }), {
      onSuccess: () => {
        modalProps.onClose()
      },
    })
  }

  if (!conversation) return null
  return (
    <>
      <MobileView>
        <Drawer {...drawerProps} placement="bottom" trapFocus={false}>
          <DrawerOverlay />
          <DrawerContent bg={drawerBg}>
            <DrawerBody p={4}>
              <Stack spacing={5}>
                {/* TODO PIN CONVERSATION */}
                {/* TODO SNOOZE CONVERSATION */}

                {/* REPORT */}
                <NextLink href={`/conversations/${conversation.id}/report`}>
                  <HStack spacing={3}>
                    <Icon as={BiFlag} boxSize="18px" />
                    <Text fontWeight="bold" fontSize="sm">
                      Report conversation
                    </Text>
                  </HStack>
                </NextLink>

                {/* DELETE */}
                <HStack spacing={3} onClick={handleOpenModal}>
                  <Icon as={BiTrash} boxSize="18px" color="red.500" />
                  <Text fontWeight="bold" fontSize="sm" color="red.500">
                    Delete conversation
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
          <Portal>
            <MenuList p={0}>
              {/* REPORT */}
              <NextLink href={`/conversations/${conversation.id}/report`}>
                <MenuItem icon={<Box as={BiFlag} />} fontWeight="bold" py={2}>
                  Report conversation
                </MenuItem>
              </NextLink>

              {/* DELETE */}
              <MenuItem icon={<Box as={BiTrash} />} fontWeight="bold" py={2} onClick={handleOpenModal}>
                Delete conversation
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </BrowserView>

      {/* DELETE CONVERSATION MODAL */}
      <Modal {...modalProps} title="Leave conversation?">
        <Text mb={6}>
          This conversation will be deleted from your inbox. Other people in the conversation will still be
          able to see it.
        </Text>
        <Stack>
          <Button bg="red" onClick={handleDeleteConversation} _hover={{ bg: "red" }}>
            Leave
          </Button>
          <Button colorScheme="monochrome" variant="outline" onClick={modalProps.onClose}>
            Cancel
          </Button>
        </Stack>
      </Modal>
    </>
  )
}
