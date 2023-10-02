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
import { PostList } from "components/PostList"

function Home() {
  const { me } = useMe()
  const { data, loading } = useGetPostsQuery({
    variables: {
      orderBy: { createdAt: SortOrder.Desc },
      where: { userId: { not: { equals: me?.id } } },
    },
  })
  const posts = data?.posts.items || []
  return (
    <Box>
      <Head>
        <title>Home / Twatter</title>
      </Head>
      <Heading fontSize="xl" pt={4} pl={4}>
        Home
      </Heading>
      <Tabs mt={6}>
        <TabList border="none">
          <Tab
            w="50%"
            fontWeight="bold"
            borderBottom="1px solid"
            borderColor={useColorModeValue("gray.100", "gray.700")}
          >
            For you
          </Tab>
          <Tab
            w="50%"
            fontWeight="bold"
            borderBottom="1px solid"
            borderColor={useColorModeValue("gray.100", "gray.700")}
          >
            Following
          </Tab>
        </TabList>
        <HomeCreatePostForm />
        <TabPanels>
          <TabPanel p={0}>
            {loading ? (
              <Center>
                <Spinner />
              </Center>
            ) : (
              <PostList posts={posts} />
            )}
          </TabPanel>
          <TabPanel p={0}>
            <p>post list following</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

Home.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>

export default withAuth(Home)
