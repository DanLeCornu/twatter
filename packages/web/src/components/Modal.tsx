import * as React from "react"
import type { IconType } from "react-icons"
import type { ModalProps } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
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
  icon?: IconType
  closeButton?: boolean
}
export function Modal({ title, icon, closeButton = false, ...props }: Props) {
  return (
    <CModal {...props} size="xs" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="md">
        {icon && <Icon as={icon} boxSize="50px" mt={4} mx="auto" />}
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
