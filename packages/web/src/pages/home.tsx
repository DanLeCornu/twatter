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
import { DesktopHomeCreatePostForm } from "components/HomeCreatePostForm"
import { HomeLayout } from "components/HomeLayout"
import { NoData } from "components/NoData"
import { PostList } from "components/PostList"
import { BrowserView } from "react-device-detect"
import { HEADING_CONTAINER_HEIGHT } from "components/MobileTopBar"

const TAB_HEIGHT = 37
export const TOTAL_HEADER_HEIGHT = HEADING_CONTAINER_HEIGHT + TAB_HEIGHT

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

  const borderColor = useColorModeValue("gray.100", "gray.700")

  return (
    <Box position="relative">
      <Head>
        <title>Home / Twatter</title>
      </Head>

      <BrowserView>
        <Box position="fixed" top={0} left={0} h={HEADING_CONTAINER_HEIGHT} zIndex={1}>
          <Heading fontSize="xl" pt={4} pl={4}>
            Home
          </Heading>
        </Box>
      </BrowserView>

      <Tabs pt={TOTAL_HEADER_HEIGHT}>
        <TabList border="none" position="fixed" left={0} top={HEADING_CONTAINER_HEIGHT} zIndex={1} w="100%">
          <Tab w="50%" fontWeight="bold" fontSize="sm" borderBottom="2px solid" borderColor={borderColor}>
            For you
          </Tab>
          <Tab w="50%" fontWeight="bold" fontSize="sm" borderBottom="2px solid" borderColor={borderColor}>
            Following
          </Tab>
        </TabList>
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
