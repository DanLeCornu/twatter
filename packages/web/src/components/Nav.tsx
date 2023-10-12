import * as React from "react"

import { useMe } from "lib/hooks/useMe"

import { BrowserView, MobileView } from "react-device-detect"
import { MobileNav } from "./MobileNav"
import { DesktopNav } from "./DesktopNav"
import { Box } from "@chakra-ui/react"

export function Nav() {
  const { me, loading } = useMe()

  if (!me || loading) return null

  return (
    <Box>
      <MobileView>
        <MobileNav />
      </MobileView>
      <BrowserView>
        <DesktopNav />
      </BrowserView>
    </Box>
  )
}
