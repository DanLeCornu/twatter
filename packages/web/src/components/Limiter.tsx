import * as React from "react"
import type { BoxProps } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"

import { DESKTOP_NAV_WIDTH } from "./DesktopNav"

export const Limiter: React.FC<BoxProps> = (props) => {
  // const px = {
  //   base: 0,
  //   md: 10,
  //   lg: 24,
  //   xl: 60,
  // }
  return <Box pl={DESKTOP_NAV_WIDTH + "px"} w="100%" maxW="600px" m="0 auto" {...props} />
}
