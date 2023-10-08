import * as React from "react"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { gql } from "@apollo/client"
import {
  Box,
  Center,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import Head from "next/head"

import { useGetMyBookmarksQuery } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { withAuth } from "components/hoc/withAuth"
import { HomeLayout } from "components/HomeLayout"
import { NAV_WIDTH } from "components/Nav"
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
  const menuProps = useDisclosure()

  const { data, loading } = useGetMyBookmarksQuery()
  const posts = data?.me?.bookmarks.map((bookmark) => bookmark.post) || []

  const bgColor = useColorModeValue("rgba(255, 255, 255, 0.85)", "rgba(26, 32, 44, 0.80)")

  return (
    <Box position="relative">
      <Head>
        <title>Bookmarks / Twatter</title>
      </Head>
      <HStack
        w={`calc(100% - ${NAV_WIDTH}px)`}
        position="fixed"
        top={0}
        left={NAV_WIDTH}
        zIndex={1}
        px={4}
        py={2}
        backdropFilter="blur(10px)"
        bgColor={bgColor}
        justify="space-between"
      >
        <Stack spacing={0}>
          <Heading fontSize="xl">Bookmarks</Heading>
          <Text color="gray.400" fontSize="xs">
            @{me?.handle}
          </Text>
        </Stack>

        <Menu {...menuProps}>
          <MenuButton
            as={IconButton}
            variant="ghost"
            boxSize="35px"
            minW="35px" // needed otherwise Chakra default styling overrides and makes it wider
            icon={<Box as={HiOutlineDotsHorizontal} boxSize="20px" />}
            onClick={menuProps.onToggle}
          />
          <Portal>
            <MenuList p={0}>
              <MenuItem fontWeight="bold" color="red.500" py={2}>
                Clear all bookmarks
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </HStack>
      {loading ? (
        <Center pt="60px">
          <Spinner />
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
