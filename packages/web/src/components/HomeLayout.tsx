import * as React from "react"
import { Box, Center, Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router"

import { useMe } from "lib/hooks/useMe"

import { Limiter } from "./Limiter"
import { BrowserView, MobileView } from "react-device-detect"
import { MobileCreatePostButton } from "./MobileCreatePostButton"
import { MobileBottomTabs, MOBILE_BOTTOM_TAB_HEIGHT } from "./MobileBottomTabs"
import { DesktopNav } from "./DesktopNav"

export const HEADING_CONTAINER_HEIGHT = 50
export const TAB_HEIGHT = 37
export const TOTAL_HEADER_HEIGHT = HEADING_CONTAINER_HEIGHT + TAB_HEIGHT

interface Props {
  children: React.ReactNode
}

export function HomeLayout(props: Props) {
  const { me, loading } = useMe()
  const router = useRouter()

  React.useEffect(() => {
    if (loading) return
    if (me && !me.handle) {
      // If no handle, needs to complete onboarding
      router.replace("/onboarding")
      return
    }
  }, [loading, me, router])

  if (loading || (me && !me.handle))
    return (
      <Center minH="100vh">
        <Spinner />
      </Center>
    )
  if (!me || loading) return null
  return (
    <Box pb={{ base: MOBILE_BOTTOM_TAB_HEIGHT, sm: undefined }}>
      {/* {["/home", "/explore", "/notifications", "/messages"].includes(router.asPath) && (
        <MobileView>
          <MobileTopBar />
        </MobileView>
      )} */}
      <Limiter>{props.children}</Limiter>
      <MobileView>
        <MobileCreatePostButton />
      </MobileView>
      <MobileView>
        <MobileBottomTabs />
      </MobileView>
      <BrowserView>
        <DesktopNav />
      </BrowserView>
    </Box>
  )
}
