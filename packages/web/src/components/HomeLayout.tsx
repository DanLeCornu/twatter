import * as React from "react"
import { BrowserView, MobileView } from "react-device-detect"
import { Box, Center, Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router"

import { useMe } from "lib/hooks/useMe"

import { DesktopNav } from "./DesktopNav"
import { Limiter } from "./Limiter"
import { MOBILE_BOTTOM_TAB_HEIGHT, MobileBottomTabs } from "./MobileBottomTabs"
import { MobileCreatePostButton } from "./MobileCreatePostButton"

export const HEADING_CONTAINER_HEIGHT = 50
export const TAB_HEIGHT = 37
export const TOTAL_HEADER_HEIGHT = HEADING_CONTAINER_HEIGHT + TAB_HEIGHT

interface Props {
  showCreateButton?: boolean
  children: React.ReactNode
}

export function HomeLayout({ showCreateButton = true, children }: Props) {
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
      <MobileView>{children}</MobileView>
      <BrowserView>
        <Limiter>{children}</Limiter>
      </BrowserView>
      {showCreateButton && (
        <MobileView>
          <MobileCreatePostButton />
        </MobileView>
      )}
      <MobileView>
        <MobileBottomTabs />
      </MobileView>
      <BrowserView>
        <DesktopNav />
      </BrowserView>
    </Box>
  )
}
