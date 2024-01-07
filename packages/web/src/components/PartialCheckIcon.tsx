import React from "react"
import type { BoxProps } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { Minus } from "lucide-react"

export function PartialCheckIcon(props: BoxProps) {
  return <Box boxSize="10px" as={Minus} color="white" {...props} />
}
