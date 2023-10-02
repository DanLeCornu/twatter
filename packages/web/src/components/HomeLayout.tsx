import * as React from "react"
import { Box } from "@chakra-ui/react"

import { Limiter } from "./Limiter"
import { Nav, NAV_WIDTH } from "./Nav"

interface Props {
  children: React.ReactNode
}

export function HomeLayout(props: Props) {
  return (
    <Box>
      <Nav />
      <Limiter pl={NAV_WIDTH + "px"}>{props.children}</Limiter>
    </Box>
  )
}
