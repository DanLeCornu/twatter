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
import { HEADING_CONTAINER_HEIGHT, HomeLayout } from "components/HomeLayout"
import { PostList } from "components/PostList"
import { useRouter } from "next/router"
import { BiArrowBack } from "react-icons/bi"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"

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
  const router = useRouter()

  const { data, loading } = useGetMyBookmarksQuery()
  const posts = data?.me?.bookmarks.map((bookmark) => bookmark.post) || []

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)
  const borderColor = useColorModeValue("gray.100", "gray.700")

  return (
    <Box position="relative">
      <Head>
        <title>Bookmarks / Twatter</title>
      </Head>
      <HStack
        position="fixed"
        top={0}
        left={0}
        w="100%"
        h={`${HEADING_CONTAINER_HEIGHT}px`}
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
        <Center pt={`${HEADING_CONTAINER_HEIGHT}px`}>
          <Spinner />
        </Center>
      ) : !loading && posts.length === 0 ? (
        <Center mt={`${HEADING_CONTAINER_HEIGHT}px`} py={6} px={6}>
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
