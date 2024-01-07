import * as React from "react"
import type { ModalProps } from "@chakra-ui/react"
import { Icon, Image } from "@chakra-ui/react"
import {
  Modal as CModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import type { LucideIcon } from "lucide-react"

interface Props extends ModalProps {
  title?: string
  icon?: LucideIcon
  image?: string
  closeButton?: boolean
}
export function Modal({ title, icon, image, closeButton = false, ...props }: Props) {
  return (
    <CModal {...props} size="xs" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="md">
        {image && <Image alt="modal image" src={image} w="50px" mt={5} mx="auto" />}
        {icon && <Icon as={icon} boxSize="50px" mt={5} mx="auto" />}
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
