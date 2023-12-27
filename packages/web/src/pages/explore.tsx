import * as React from "react"
import { MobileView } from "react-device-detect"
import { BiSearch, BiX } from "react-icons/bi"
import { gql } from "@apollo/client"
import { Button, Divider, InputProps, Stack, useDisclosure } from "@chakra-ui/react"
import { Center, Flex, Spinner } from "@chakra-ui/react"
import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
  Text,
} from "@chakra-ui/react"
import Head from "next/head"

import {
  GetRecentSearchesDocument,
  QueryMode,
  useClearAllSearchesMutation,
  useGetRecentSearchesQuery,
  useGetSearchUsersQuery,
  useGetTagsQuery,
  useLogSearchMutation,
} from "lib/graphql"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { withAuth } from "components/hoc/withAuth"
import { HomeLayout } from "components/HomeLayout"
import { MobileTopBarAvatar } from "components/MobileTopBarAvatar"
import { UserSearchItem } from "components/UserSearchItem"
import { TagSearchItem } from "components/TagSearchItem"
import { useMutationHandler } from "lib/hooks/useMutationHandler"
import { RecentSearchItem } from "components/RecentSearchItem"
import { Modal } from "components/Modal"

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
  fragment RecentSearchItem on Search {
    id
    text
  }
  query GetRecentSearches {
    recentSearches {
      items {
        ...RecentSearchItem
      }
      count
    }
  }
  mutation LogSearch($text: String!) {
    createSearch(text: $text)
  }
  mutation ClearAllSearches {
    clearAllSearches
  }
`

function Explore() {
  const handler = useMutationHandler()
  const modalProps = useDisclosure()
  const [search, setSearch] = React.useState("")

  const { data: recentSearchData, loading: recentSearchesLoading } = useGetRecentSearchesQuery()
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
  const [clearAllSearches, { loading: clearAllLoading }] = useClearAllSearchesMutation({
    refetchQueries: [{ query: GetRecentSearchesDocument }],
  })

  const handleClearAll = () => {
    return handler(() => clearAllSearches(), {
      onSuccess: () => {
        modalProps.onClose()
      },
    })
  }

  const users = userData?.users.items || []
  const tags = tagData?.tags.items || []
  const recentSearches = recentSearchData?.recentSearches.items || []

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)
  const borderColor = useColorModeValue("gray.100", "gray.700")
  const isLoading = usersLoading || tagsLoading || recentSearchesLoading

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
      >
        <MobileView>
          <MobileTopBarAvatar />
        </MobileView>
        <ExploreSearch search={search} setSearch={setSearch} />
      </HStack>
      <Box pt="60px">
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : !isLoading && !search ? (
          recentSearches.length === 0 ? (
            <Text fontSize="sm" color="gray.400" textAlign="center" w="100%">
              Try searching for people, tags, or keywords
            </Text>
          ) : (
            <>
              <HStack justify="space-between" px={4}>
                <Text fontSize="lg" fontWeight="bold">
                  Recent
                </Text>
                <Button variant="ghost" onClick={modalProps.onOpen} color="brand.blue" size="sm">
                  Clear all
                </Button>
              </HStack>
              {recentSearches.map((search, i) => (
                <RecentSearchItem key={i} search={search} />
              ))}
              <Modal {...modalProps} title="Clear all recent searches?">
                <Text mb={6}>This can't be undone and you'll remove all your recent searches</Text>
                <Stack>
                  <Button
                    onClick={handleClearAll}
                    isLoading={clearAllLoading}
                    bg="red"
                    _hover={{ bg: "red" }}
                  >
                    Clear
                  </Button>
                  <Button colorScheme="monochrome" variant="outline" onClick={modalProps.onClose}>
                    Cancel
                  </Button>
                </Stack>
              </Modal>
            </>
          )
        ) : (
          <Box>
            {tags.length > 0 ? (
              tags.map((tag, i) => <TagSearchItem key={i} tag={tag} />)
            ) : (
              // TODO link to /search?query={search}
              <Text px={4} py={2}>
                Search for "{search}"
              </Text>
            )}
            <Divider my={2} />
            {users.length > 0 ? (
              users.map((user, i) => <UserSearchItem key={i} user={user} />)
            ) : (
              // TODO link to /search?query={search}
              <Text px={4} py={2}>
                Go to @{search}
              </Text>
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}

Explore.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>

export default withAuth(Explore)

interface Props extends InputProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

function ExploreSearch({ search, setSearch, ...props }: Props) {
  // const router = useRouter()
  const handler = useMutationHandler()
  const [logSearch] = useLogSearchMutation({ refetchQueries: [{ query: GetRecentSearchesDocument }] })
  const [previousSearch, setPreviousSearch] = React.useState("")

  const handleSubmit = () => {
    if (!search || search.trim() === previousSearch.trim()) return
    setPreviousSearch(search.trim())
    handler(() => logSearch({ variables: { text: search.trim() } })) // async log the search without blocking
    // router.push(`/search?query=${search}`)
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault() // stops page refreshing, default html form behaviour
        handleSubmit()
      }}
    >
      <InputGroup>
        <InputLeftElement h="100%" pl={2}>
          <Flex align="center">
            <IconButton
              rounded="full"
              size="sm"
              aria-label="search"
              variant="ghost"
              color="gray.500"
              icon={<Box as={BiSearch} boxSize="20px" />}
              type="submit"
            />
          </Flex>
        </InputLeftElement>
        <Input
          rounded="full"
          pl="50px !important"
          px={10}
          size="sm"
          value={search}
          {...props}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          fontSize="15px"
        />
        <InputRightElement h="100%" pr={2}>
          {!!search && (
            <IconButton
              rounded="full"
              onClick={() => setSearch("")}
              size="xs"
              aria-label="clear search"
              icon={<Box as={BiX} boxSize="20px" color="black.500" />}
            />
          )}
        </InputRightElement>
      </InputGroup>
    </form>
  )
}
