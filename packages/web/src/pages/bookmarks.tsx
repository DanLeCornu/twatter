import * as React from "react"
import { BiArrowBack } from "react-icons/bi"
import { gql } from "@apollo/client"
import {
  Box,
  Center,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"

import { useGetMyBookmarksQuery } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { BookmarksMenu } from "components/BookmarksMenu"
import { withAuth } from "components/hoc/withAuth"
import { HEADING_CONTAINER_HEIGHT, HomeLayout } from "components/HomeLayout"
import { PostList } from "components/PostList"

const _ = gql`
  fragment BookmarkItem on Bookmark {
    id
    post {
      ...PostItem
    }
  }
  query GetMyBookmarks {
    me {
      id
      bookmarks {
        ...BookmarkItem
      }
    }
  }
`

function Bookmarks() {
  const { me } = useMe()
  const router = useRouter()

  const { data, loading } = useGetMyBookmarksQuery()
  const posts = data?.me?.bookmarks.map((bookmark) => bookmark.post) || []

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)
  const borderColor = useColorModeValue("gray.100", "gray.700")

  return (
    <Box>
      <Head>
        <title>Bookmarks / Twatter</title>
      </Head>
      <HStack
        position="fixed"
        top={0}
        left={0}
        w="100%"
        h={HEADING_CONTAINER_HEIGHT + "px"}
        zIndex={1}
        p={2}
        backdropFilter="blur(10px)"
        bgColor={bgColor}
        justify="space-between"
        borderBottom="1px"
        borderColor={borderColor}
      >
        <HStack>
          <IconButton
            aria-label="back"
            icon={<Box as={BiArrowBack} boxSize="20px" />}
            variant="ghost"
            onClick={() => router.back()}
          />

          <Stack spacing={0}>
            <Heading fontSize="lg">Bookmarks</Heading>
            <Text color="gray.400" fontSize="xs">
              @{me?.handle}
            </Text>
          </Stack>
        </HStack>

        {posts.length > 0 && <BookmarksMenu />}
      </HStack>
      {loading ? (
        <Center pt={HEADING_CONTAINER_HEIGHT + "px"}>
          <Spinner />
        </Center>
      ) : !loading && posts.length === 0 ? (
        <Center mt={HEADING_CONTAINER_HEIGHT + "px"} py={6} px={6}>
          <Stack>
            <Heading>Save posts for later</Heading>
            <Text fontSize="sm" color="gray.400">
              Bookmark posts to easily find them again in the future
            </Text>
          </Stack>
        </Center>
      ) : (
        <Box pt="60px">
          <PostList posts={posts} />
        </Box>
      )}
    </Box>
  )
}

Bookmarks.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>

export default withAuth(Bookmarks)
