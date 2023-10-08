import * as React from "react"
import {
  Box,
  Center,
  Heading,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react"
import Head from "next/head"

import { SortOrder, useGetPostsQuery } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { withAuth } from "components/hoc/withAuth"
import { HomeCreatePostForm } from "components/HomeCreatePostForm"
import { HomeLayout } from "components/HomeLayout"
import { NAV_WIDTH } from "components/Nav"
import { NoData } from "components/NoData"
import { PostList } from "components/PostList"

function Home() {
  const { me } = useMe()

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

  const bgColor = useColorModeValue("rgba(255, 255, 255, 0.85)", "rgba(26, 32, 44, 0.80)")
  const borderColor = useColorModeValue("gray.100", "gray.700")
  const HEADING_CONTAINER_HEIGHT = 65
  const TAB_HEIGHT = 37
  const CONTENT_TOP_PADDING = HEADING_CONTAINER_HEIGHT + TAB_HEIGHT

  return (
    <Box position="relative">
      <Head>
        <title>Home / Twatter</title>
      </Head>
      {/* Underlay that provides blurred background */}
      <Box
        position="fixed"
        left={NAV_WIDTH}
        top={0}
        h="102px"
        w={`calc(100% - ${NAV_WIDTH}px)`}
        backdropFilter="blur(10px)"
        bgColor={bgColor}
        zIndex={1}
      />
      <Box
        w={`calc(100% - ${NAV_WIDTH}px)`}
        position="fixed"
        top={0}
        left={NAV_WIDTH}
        h={HEADING_CONTAINER_HEIGHT}
        zIndex={1}
      >
        <Heading fontSize="xl" pt={4} pl={4}>
          Home
        </Heading>
      </Box>
      <Tabs pt={CONTENT_TOP_PADDING}>
        <TabList
          border="none"
          position="fixed"
          w={`calc(100% - ${NAV_WIDTH}px)`}
          left={NAV_WIDTH}
          top={HEADING_CONTAINER_HEIGHT}
          zIndex={1}
        >
          <Tab w="50%" fontWeight="bold" fontSize="sm" borderBottom="2px solid" borderColor={borderColor}>
            For you
          </Tab>
          <Tab w="50%" fontWeight="bold" fontSize="sm" borderBottom="2px solid" borderColor={borderColor}>
            Following
          </Tab>
        </TabList>
        <HomeCreatePostForm />
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
