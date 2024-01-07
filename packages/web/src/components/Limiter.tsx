import * as React from "react"
import type { BoxProps } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"

export const Limiter: React.FC<BoxProps> = (props) => {
  return (
    <Box
      {...props}
      w="100%"
      h="100%"
      maxW={{ base: "688px", md: "688px", lg: "1100px", xl: "1280px" }}
      m="0 auto"
      // border="1px"
      // borderColor="red"
    >
      {props.children}
    </Box>
  )
}
