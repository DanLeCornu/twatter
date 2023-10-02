import * as React from "react"
import type { ModalProps } from "@chakra-ui/react"
import {
  Modal as CModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"

interface Props extends ModalProps {
  title?: string
  closeButton?: boolean
}
export function Modal({ title, closeButton = false, ...props }: Props) {
  return (
    <CModal {...props} size="xs" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="md">
        {closeButton && <ModalCloseButton />}
        {title && (
          <ModalHeader pb={0} px={7}>
            {title}
          </ModalHeader>
        )}
        <ModalBody pb={6} px={7} color="gray.400" fontSize="sm">
          {props.children}
        </ModalBody>
      </ModalContent>
    </CModal>
  )
}
