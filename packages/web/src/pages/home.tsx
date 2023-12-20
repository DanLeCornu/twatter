import * as React from "react"
import { BrowserView, MobileView } from "react-device-detect"
import {
  Box,
  Center,
  Heading,
  Image,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import Head from "next/head"

import { SortOrder, useGetPostsQuery } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { withAuth } from "components/hoc/withAuth"
import { DesktopHomeCreatePostForm } from "components/DesktopHomeCreatePostForm"
import { HEADING_CONTAINER_HEIGHT, HomeLayout, TAB_HEIGHT, TOTAL_HEADER_HEIGHT } from "components/HomeLayout"
import { MobileTopBarAvatar } from "components/MobileTopBarAvatar"
import { NoData } from "components/NoData"
import { PostList } from "components/PostList"

function Home() {
  const { me } = useMe()
  const { colorMode } = useColorMode()

  const followingIds = me?.following.map((user) => user.id) || []

  const { data, loading } = useGetPostsQuery({
    variables: {
      orderBy: { createdAt: SortOrder.Desc },
      where: { userId: { not: { equals: me?.id } } },
    },
  })
  const allPosts = data?.posts.items || []

  const { data: followingData, loading: followingLoading } = useGetPostsQuery({
    variables: {
      orderBy: { createdAt: SortOrder.Desc },
      where: { userId: { not: { equals: me?.id }, in: followingIds } },
    },
  })
  const followingPosts = followingData?.posts.items || []

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)
  const borderColor = useColorModeValue("gray.100", "gray.700")
  const tabActiveColor = useColorModeValue("black", "white")
  const tabInactiveColor = useColorModeValue("gray.600", "gray.500")

  return (
    <Box position="relative">
      <Head>
        <title>Home / Twatter</title>
      </Head>

      {/* Shared underlay that provides blurred background */}
      <Box
        position="fixed"
        left={0}
        top={0}
        h={TOTAL_HEADER_HEIGHT}
        w="100%"
        backdropFilter="blur(10px)"
        bg={bgColor}
        zIndex={1}
      />

      <BrowserView>
        <Box position="fixed" top={0} left={0} h={HEADING_CONTAINER_HEIGHT} zIndex={1} pt={4} pl={4}>
          <Heading fontSize="xl">Home</Heading>
        </Box>
      </BrowserView>

      <MobileView>
        <Box position="fixed" top={0} left={0} h={HEADING_CONTAINER_HEIGHT} zIndex={1} pt={2} px={4} w="100%">
          <Box position="relative">
            <MobileTopBarAvatar />

            <Center w="100%" position="absolute" top="5px">
              <Image
                alt="twatter logo"
                src={colorMode === "dark" ? "twatter-logo-white.png" : "twatter-logo-black.png"}
                w="28px"
              />
            </Center>
          </Box>
        </Box>
      </MobileView>

      <Tabs h={TAB_HEIGHT} pt={TOTAL_HEADER_HEIGHT}>
        <Box borderBottom="1px" borderColor={borderColor} pb={1}>
          <TabList
            border="none"
            position="fixed"
            left={0}
            top={HEADING_CONTAINER_HEIGHT}
            zIndex={1}
            w="100%"
            justifyContent="space-evenly"
          >
            <Tab
              fontWeight="medium"
              fontSize="sm"
              _selected={{ color: tabActiveColor, borderColor: "brand.blue", borderBottomWidth: "3.5px" }}
              color={tabInactiveColor}
              px={1}
            >
              For you
            </Tab>
            <Tab
              fontWeight="medium"
              fontSize="sm"
              _selected={{ color: tabActiveColor, borderColor: "brand.blue", borderBottomWidth: "3.5px" }}
              color={tabInactiveColor}
              px={1}
            >
              Following
            </Tab>
          </TabList>
        </Box>
        <BrowserView>
          <DesktopHomeCreatePostForm />
        </BrowserView>
        <TabPanels>
          <TabPanel p={0}>
            {loading ? (
              <Center pt={8}>
                <Spinner />
              </Center>
            ) : (
              // TODO: figure out what "for you" posts are
              <PostList posts={allPosts} />
            )}
          </TabPanel>
          <TabPanel p={0}>
            {followingLoading ? (
              <Center pt={8}>
                <Spinner />
              </Center>
            ) : followingIds.length > 0 ? (
              <PostList posts={followingPosts} />
            ) : (
              <Center px={8} py={4}>
                <NoData>You're not following anyone yet</NoData>
              </Center>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

Home.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>

export default withAuth(Home)
