import * as React from "react"
import { MobileView } from "react-device-detect"
import { BiArrowBack } from "react-icons/bi"
import { gql } from "@apollo/client"
import { Divider, Stack } from "@chakra-ui/react"
import { Center, Spinner } from "@chakra-ui/react"
import { Box, HStack, IconButton, Text, useColorModeValue } from "@chakra-ui/react"
import Head from "next/head"
import NextLink from "next/link"

import {
  QueryMode,
  SortOrder,
  useGetSearchUsersQuery,
  useGetTagsQuery,
  useGetTrendingTagsQuery,
} from "lib/graphql"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { ExploreSearch } from "components/ExploreSearch"
import { ExploreTrendItem } from "components/ExploreTrendItem"
import { withAuth } from "components/hoc/withAuth"
import { HomeLayout } from "components/HomeLayout"
import { MobileTopBarAvatar } from "components/MobileTopBarAvatar"
import { RecentSearches } from "components/RecentSearches"
import { TagSearchItem } from "components/TagSearchItem"
import { UserSearchItem } from "components/UserSearchItem"

const _ = gql`
  fragment UserSearchItem on User {
    id
    name
    avatar
    handle
  }
  query GetSearchUsers(
    $orderBy: [UserOrderByWithRelationInput!]
    $where: UserWhereInput
    $skip: Int
    $take: Int
  ) {
    users(take: $take, orderBy: $orderBy, where: $where, skip: $skip) {
      items {
        ...UserSearchItem
      }
      count
    }
  }
  mutation LogSearch($text: String!) {
    createSearch(text: $text)
  }
  query GetTrendingTags($orderBy: [TagOrderByWithRelationInput!], $take: Int) {
    tags(orderBy: $orderBy, take: $take) {
      items {
        ...ExploreTagItem
      }
      count
    }
  }
`

function Explore() {
  const [search, setSearch] = React.useState("")
  const [isSearchActive, setIsSearchActive] = React.useState(false)

  const { data: trendingTagData, loading: trendingTagsLoading } = useGetTrendingTagsQuery({
    variables: {
      take: 5,
      orderBy: { posts: { _count: SortOrder.Desc } },
    },
  })
  const { data: tagData, loading: tagsLoading } = useGetTagsQuery({
    variables: {
      take: 3,
      where: {
        OR: [{ name: search ? { contains: search, mode: QueryMode.Insensitive } : undefined }],
      },
    },
  })
  const { data: userData, loading: usersLoading } = useGetSearchUsersQuery({
    variables: {
      take: 10,
      where: {
        handle: { not: null },
        OR: [
          { name: search ? { contains: search, mode: QueryMode.Insensitive } : undefined },
          { handle: search ? { contains: search, mode: QueryMode.Insensitive } : undefined },
          { bio: search ? { contains: search, mode: QueryMode.Insensitive } : undefined },
        ],
      },
    },
  })

  const users = userData?.users.items || []
  const tags = tagData?.tags.items || []
  const trendingTags = trendingTagData?.tags.items || []

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)
  const borderColor = useColorModeValue("gray.100", "gray.700")
  const isLoading = usersLoading || tagsLoading || trendingTagsLoading

  return (
    <Box position="relative">
      <Head>
        <title>Explore / Twatter</title>
      </Head>
      <HStack
        position="fixed"
        top={0}
        left={0}
        zIndex={1}
        px={4}
        py={2}
        backdropFilter="blur(10px)"
        bgColor={bgColor}
        align="center"
        h="50px"
        spacing={5}
        borderBottom="1px"
        borderColor={borderColor}
        justify="center"
        w="100%"
      >
        <MobileView>
          {isSearchActive ? (
            <IconButton
              minW="30px" // needed otherwise chakra default will be 40px width
              aria-label="back"
              icon={<Box as={BiArrowBack} boxSize="18px" />}
              variant="ghost"
              onClick={() => {
                setIsSearchActive(false)
                setSearch("")
              }}
            />
          ) : (
            <MobileTopBarAvatar />
          )}
        </MobileView>
        <ExploreSearch
          search={search}
          setSearch={setSearch}
          isSearchActive={isSearchActive}
          setIsSearchActive={setIsSearchActive}
        />
      </HStack>
      <Box pt="60px">
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : isSearchActive && !search ? (
          <RecentSearches setIsSearchActive={setIsSearchActive} />
        ) : !isSearchActive && !search ? (
          <Stack mx={4} spacing={6}>
            <Text fontSize="xl" fontWeight="bold">
              Trends for you
            </Text>
            <Stack spacing={4}>
              {trendingTags.map((tag, i) => (
                <ExploreTrendItem key={i} tag={tag} />
              ))}
            </Stack>
          </Stack>
        ) : (
          <Box>
            {tags.length > 0 ? (
              tags.map((tag, i) => <TagSearchItem key={i} tag={tag} setIsSearchActive={setIsSearchActive} />)
            ) : (
              <NextLink href={`/search?q=${search}`}>
                <Text px={4} py={2}>
                  Search for "{search}"
                </Text>
              </NextLink>
            )}
            <Divider my={2} />
            {users.length > 0 ? (
              users.map((user, i) => (
                <UserSearchItem key={i} user={user} setIsSearchActive={setIsSearchActive} />
              ))
            ) : (
              <NextLink href={`/search?q=${search}`}>
                <Text px={4} py={2}>
                  Go to @{search}
                </Text>
              </NextLink>
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}

Explore.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>

export default withAuth(Explore)
