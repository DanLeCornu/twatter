import * as React from "react"
import { BrowserView, MobileView } from "react-device-detect"
import { gql } from "@apollo/client"
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Icon,
  Menu,
  MenuItem,
  MenuList,
  Portal,
  Stack,
  Text,
  useClipboard,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import { CopyPlus, Flag, Trash } from "lucide-react"
import NextLink from "next/link"

import type { MessageItemFragment } from "lib/graphql"
import { GetMyConversationsDocument, useDeleteMessageMutation } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"
import { useToast } from "lib/hooks/useToast"

import { Modal } from "./Modal"
import type { DisclosureProps } from "./ProfileMenu"

const _ = gql`
  mutation DeleteMessage($messageId: String!) {
    deleteMessage(messageId: $messageId)
  }
`

interface Props {
  message?: MessageItemFragment
  disclosureProps: DisclosureProps
  refetch: () => void
}

export function MessageMenu({ message, disclosureProps, refetch }: Props) {
  const { me } = useMe()
  const toast = useToast()
  const modalProps = useDisclosure()
  const handler = useMutationHandler()
  const drawerBg = useColorModeValue("white", "brand.bgDark")

  const { onCopy } = useClipboard(message?.text || "")

  const [deleteMessage] = useDeleteMessageMutation({
    refetchQueries: [{ query: GetMyConversationsDocument }],
  })

  const handleOpenModal = () => {
    disclosureProps.onClose()
    modalProps.onOpen()
  }

  const handleDeleteMessage = () => {
    if (!message) return
    return handler(() => deleteMessage({ variables: { messageId: message.id } }), {
      onSuccess: () => {
        refetch() // Refetches the messages query
        modalProps.onClose()
      },
    })
  }

  const handleCopy = () => {
    onCopy()
    disclosureProps.onClose()
    toast({ description: "Copied to clipboard" })
  }

  if (!message) return null

  return (
    <>
      <MobileView>
        <Drawer {...disclosureProps} placement="bottom" trapFocus={false}>
          <DrawerOverlay />
          <DrawerContent bg={drawerBg}>
            <DrawerBody p={4}>
              <Stack spacing={5}>
                {/* TODO REPLY TO MESSAGE */}

                {/* REPORT */}
                {message.senderId !== me?.id && (
                  <NextLink href={`/messages/report/${message.id}`}>
                    <HStack spacing={3}>
                      <Icon as={Flag} boxSize="18px" />
                      <Text fontWeight="bold" fontSize="sm">
                        Report message
                      </Text>
                    </HStack>
                  </NextLink>
                )}

                {/* COPY */}
                <HStack spacing={3} onClick={handleCopy}>
                  <Icon as={CopyPlus} boxSize="18px" />
                  <Text fontWeight="bold" fontSize="sm">
                    Copy message
                  </Text>
                </HStack>

                {/* DELETE */}
                <HStack spacing={3} onClick={handleOpenModal}>
                  <Icon as={Trash} boxSize="18px" />
                  <Text fontWeight="bold" fontSize="sm">
                    Delete for you
                  </Text>
                </HStack>

                <Button variant="outline" colorScheme="monochrome" onClick={disclosureProps.onClose}>
                  Cancel
                </Button>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </MobileView>
      <BrowserView>
        <Menu {...disclosureProps}>
          <Portal>
            <MenuList p={0}>
              {/* REPORT */}
              {message.senderId !== me?.id && (
                <NextLink href={`/messages/report/${message.id}`}>
                  <MenuItem icon={<Box as={Flag} />} fontWeight="bold" py={2}>
                    Report message
                  </MenuItem>
                </NextLink>
              )}

              {/* COPY */}
              <MenuItem icon={<Box as={Flag} />} fontWeight="bold" py={2} onClick={handleCopy}>
                Copy message
              </MenuItem>

              {/* DELETE */}
              <MenuItem icon={<Box as={Trash} />} fontWeight="bold" py={2} onClick={handleOpenModal}>
                Delete for you
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </BrowserView>

      {/* DELETE MESSAGE MODAL */}
      <Modal {...modalProps} title="Delete message?">
        <Text mb={6}>
          This message will be deleted for you. Other people in the conversation will still be able to see it.
        </Text>
        <Stack>
          <Button bg="red" onClick={handleDeleteMessage} _hover={{ bg: "red" }}>
            Delete
          </Button>
          <Button colorScheme="monochrome" variant="outline" onClick={modalProps.onClose}>
            Cancel
          </Button>
        </Stack>
      </Modal>
    </>
  )
}
