import * as React from "react"
import { Box, Center, Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router"

import { useMe } from "lib/hooks/useMe"

import { Limiter } from "./Limiter"
import { Nav } from "./Nav"
import { MobileView } from "react-device-detect"
import { MobileTopBar } from "./MobileTopBar"

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
  return (
    <Box>
      {["/home", "/explore", "/notifications", "/messages"].includes(router.asPath) && (
        <MobileView>
          <MobileTopBar />
        </MobileView>
      )}
      <Limiter>{props.children}</Limiter>
      <Nav />
    </Box>
  )
}
