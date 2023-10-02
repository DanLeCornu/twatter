import React from "react"
import { ImMinus } from "react-icons/im"
import type { BoxProps } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"

export function PartialCheckIcon(props: BoxProps) {
  return <Box boxSize="10px" as={ImMinus} color="white" {...props} />
}
