import * as React from "react"
import { MobileView } from "react-device-detect"
import { BiArrowBack } from "react-icons/bi"
import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import Head from "next/head"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { QueryMode, useGetSearchUsersQuery, useGetTagsQuery } from "lib/graphql"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { CustomTab } from "components/CustomTab"
import { ExploreSearch } from "components/ExploreSearch"
import { withAuth } from "components/hoc/withAuth"
import { HomeLayout } from "components/HomeLayout"
import { RecentSearches } from "components/RecentSearches"
import { TagSearchItem } from "components/TagSearchItem"
import { UserSearchItem } from "components/UserSearchItem"

function Search() {
  const router = useRouter()
  const query = router.query.q as string
  const tab = router.query.t as string

  // Set default tab to "Top"
  if (!tab) {
    router.query.t = "top"
    router.push(router)
  }

  React.useEffect(() => {
    if (!query) router.push("/explore")
  }, [query, router])

  const [search, setSearch] = React.useState(query)
  const [isSearchActive, setIsSearchActive] = React.useState(false)

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

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)
  const borderColor = useColorModeValue("gray.100", "gray.700")
  const SEARCH_HEIGHT = 50
  const TAB_HEIGHT = 50
  const TOTAL_HEIGHT = isSearchActive ? SEARCH_HEIGHT : SEARCH_HEIGHT + TAB_HEIGHT

  const isLoading = tagsLoading || usersLoading

  return (
    <Box position="relative">
      <Head>
        <title>Explore / Twatter</title>
      </Head>
      <Stack
        position="fixed"
        top={0}
        left={0}
        zIndex={1}
        backdropFilter="blur(10px)"
        bgColor={bgColor}
        align="center"
        h={TOTAL_HEIGHT + "px"}
        spacing={0}
        w="100%"
      >
        <HStack px={4} py={2} h={SEARCH_HEIGHT + "px"} justify="center" w="100%">
          <MobileView>
            <IconButton
              minW="30px" // needed otherwise chakra default will be 40px width
              aria-label="back"
              icon={<Box as={BiArrowBack} boxSize="18px" />}
              variant="ghost"
              onClick={() => {
                if (isSearchActive) {
                  setIsSearchActive(false)
                } else {
                  router.push("/explore")
                }
              }}
            />
          </MobileView>
          <ExploreSearch
            search={search}
            setSearch={setSearch}
            isSearchActive={isSearchActive}
            setIsSearchActive={setIsSearchActive}
          />
        </HStack>
        {!isSearchActive && (
          <Flex borderBottom="1px" borderColor={borderColor} w="100%" h={TAB_HEIGHT + "px"} justify="center">
            <Flex overflowX="scroll" sx={{ "&::-webkit-scrollbar": { display: "none" } }}>
              <CustomTab isActive={tab === "top"} href={`/search?q=${query}&t=top`}>
                Top
              </CustomTab>
              <CustomTab isActive={tab === "latest"} href={`/search?q=${query}&t=latest`}>
                Latest
              </CustomTab>
              <CustomTab isActive={tab === "people"} href={`/search?q=${query}&t=people`}>
                People
              </CustomTab>
            </Flex>
          </Flex>
        )}
      </Stack>
      <Box pt={TOTAL_HEIGHT + 10 + "px"} mx={4}>
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : isSearchActive && !search ? (
          <RecentSearches setIsSearchActive={setIsSearchActive} />
        ) : isSearchActive && search ? (
          <Box>
            {tags.length > 0 ? (
              tags.map((tag, i) => <TagSearchItem key={i} tag={tag} setIsSearchActive={setIsSearchActive} />)
            ) : (
              <NextLink href={`/search?q=${search}`}>
                <Text
                  px={4}
                  py={2}
                  onClick={() => {
                    setIsSearchActive(false)
                    setSearch("")
                  }}
                >
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
                <Text
                  px={4}
                  py={2}
                  onClick={() => {
                    setIsSearchActive(false)
                    setSearch("")
                  }}
                >
                  Go to @{search}
                </Text>
              </NextLink>
            )}
          </Box>
        ) : (
          <>
            <p>else</p>
            <p>search: {search}</p>
          </>
        )}
      </Box>
    </Box>
  )
}

Search.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>

export default withAuth(Search)
