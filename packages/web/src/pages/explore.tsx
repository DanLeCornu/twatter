import * as React from "react"
import { MobileView } from "react-device-detect"
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

import { QueryMode, useGetSearchUsersQuery } from "lib/graphql"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { ExploreUserList } from "components/ExploreUserList"
import { withAuth } from "components/hoc/withAuth"
import { HomeLayout } from "components/HomeLayout"
import { MobileTopBarAvatar } from "components/MobileTopBarAvatar"

const _ = gql`
  fragment UserSearchItem on User {
    id
    name
    avatar
    handle
  }
  query GetSearchUsers($orderBy: [UserOrderByWithRelationInput!], $where: UserWhereInput, $skip: Int) {
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

  const { data, loading } = useGetSearchUsersQuery({
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

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)
  const borderColor = useColorModeValue("gray.100", "gray.700")

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
  )
}
