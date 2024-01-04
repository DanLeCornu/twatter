import * as React from "react"
import { BrowserView, MobileView } from "react-device-detect"
import { Badge, Box, Center, Flex,Spinner, Text, useBreakpointValue } from "@chakra-ui/react"
import { useRouter } from "next/router"

import { useMe } from "lib/hooks/useMe"

import { DesktopNav } from "./DesktopNav"
import { Limiter } from "./Limiter"
import { MobileBottomTabs } from "./MobileBottomTabs"
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
    if (!me && !loading) {
      router.replace("/")
    }
    if (me && !me.handle) {
      // If no handle, needs to complete onboarding
      router.replace("/onboarding")
      return
    }
  }, [loading, me, router])

  if (loading || !me || (me && !me.handle))
    return (
      <Center minH="100vh">
        <Spinner />
      </Center>
    )
  return (
    <Box>
      <MobileView>
        {children}
        {showCreateButton && <MobileCreatePostButton />}
        <MobileBottomTabs />
      </MobileView>
      <BrowserView>
        <BreakpointBadge />
        <Limiter>
          <Flex>
            <DesktopNav />
            {children}
          </Flex>
        </Limiter>
      </BrowserView>
    </Box>
  )
}

export function BreakpointBadge() {
  const breakpoint = useBreakpointValue({ base: "base", sm: "small", md: "medium", lg: "large", xl: "xl" })
  const [width, setWidth] = React.useState<number | undefined>()
  React.useLayoutEffect(() => {
    const updateSize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", updateSize)
    updateSize()
    return () => window.removeEventListener("resize", updateSize)
  }, [])
  return (
    <Badge
      variant="solid"
      pos="fixed"
      top={2}
      left={2}
      zIndex={1000}
      fontSize="20px"
      colorScheme={
        breakpoint === "base"
          ? "gray"
          : breakpoint === "small"
          ? "blue"
          : breakpoint === "medium"
          ? "purple"
          : breakpoint === "large"
          ? "red"
          : "green"
      }
    >
      <Text>
        {breakpoint} - {width}px
      </Text>
    </Badge>
  )
}
