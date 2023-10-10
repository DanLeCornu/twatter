import * as React from "react"
import { BiSearch, BiX } from "react-icons/bi"
import { gql } from "@apollo/client"
import type { InputProps } from "@chakra-ui/react"
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
} from "@chakra-ui/react"
import Head from "next/head"

import { QueryMode, useGetExploreUsersQuery } from "lib/graphql"
import { ExploreUserList } from "components/ExploreUserList"
import { withAuth } from "components/hoc/withAuth"
import { HomeLayout } from "components/HomeLayout"
import { NAV_WIDTH } from "components/Nav"

const _ = gql`
  fragment UserSearchItem on User {
    id
    name
    avatar
    handle
  }
  query GetExploreUsers($orderBy: [UserOrderByWithRelationInput!], $where: UserWhereInput, $skip: Int) {
    users(take: 10, orderBy: $orderBy, where: $where, skip: $skip) {
      items {
        ...UserSearchItem
      }
      count
    }
  }
`

function Explore() {
  const [search, setSearch] = React.useState("")

  const { data, loading } = useGetExploreUsersQuery({
    variables: {
      // orderBy: { createdAt: SortOrder.Desc },
      where: {
        OR: [
          { name: search ? { contains: search, mode: QueryMode.Insensitive } : undefined },
          { handle: search ? { contains: search, mode: QueryMode.Insensitive } : undefined },
          { bio: search ? { contains: search, mode: QueryMode.Insensitive } : undefined },
        ],
      },
    },
  })
  const users = data?.users.items || []

  const bgColor = useColorModeValue("rgba(255, 255, 255, 0.85)", "rgba(26, 32, 44, 0.80)")

  return (
    <Box position="relative">
      <Head>
        <title>Explore / Twatter</title>
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
      >
        <Search search={search} setSearch={setSearch} />
      </HStack>
      {loading ? (
        <Center pt="60px">
          <Spinner />
        </Center>
      ) : (
        <Box pt="60px">
          <ExploreUserList users={users} />
        </Box>
      )}
    </Box>
  )
}

Explore.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>

export default withAuth(Explore)

interface Props extends InputProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export function Search({ search, setSearch, ...props }: Props) {
  return (
    <Box>
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
            />
          </Flex>
        </InputLeftElement>
        <Input
          rounded="full"
          pl="50px !important"
          px={10}
          size="lg"
          value={search}
          {...props}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          fontSize="15p6"
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
    </Box>
  )
}
