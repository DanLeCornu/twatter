import type { UseToastOptions } from "@chakra-ui/react"
import { useToast as useChakraToast } from "@chakra-ui/react"

import { CustomToast } from "components/CustomToast"

export interface CustomToastProps extends UseToastOptions {
  link?: string
  linkText?: string
  action?: React.ReactNode
}

export function useToast() {
  const toast = useChakraToast()
  const handleToast = ({ link, linkText, action, ...props }: CustomToastProps) => {
    toast.closeAll() // first, close any open toasts to prevent weird stacking behaviour
    toast({
      position: "bottom",
      render: () =>
        CustomToast({ description: props.description, link, linkText, action, onClose: toast.closeAll }),
      ...props,
    })
  }
  return handleToast
}
