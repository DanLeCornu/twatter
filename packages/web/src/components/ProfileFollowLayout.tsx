import * as React from "react"
import { BiArrowBack } from "react-icons/bi"
import { gql } from "@apollo/client"
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { useGetProfileFollowQuery } from "lib/graphql"

import { NoData } from "./NoData"
import { CustomTab } from "./CustomTab"

const _ = gql`
  fragment UserFollowItem on User {
    id
    avatar
    name
    handle
    bio
  }
  fragment UserProfileFollow on User {
    id
    name
    handle
    followers {
      ...UserFollowItem
    }
    following {
      ...UserFollowItem
    }
  }

  query GetProfileFollow($where: UserWhereInput!) {
    user(where: $where) {
      ...UserProfileFollow
    }
  }
`

export function ProfileFollowLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const handle = router.query.handle as string

  const { data, loading } = useGetProfileFollowQuery({
    variables: { where: { handle: { equals: handle } } },
  })
  const user = data?.user

  const borderColor = useColorModeValue("gray.100", "gray.700")

  if (loading && !user)
    return (
      <Center minH="80vh">
        <Spinner />
      </Center>
    )
  if (!user)
    return (
      <Center minH="80vh">
        <NoData>Profile not found</NoData>
      </Center>
    )
  return (
    <Box>
      <HStack>
        <NextLink href={`/${user.handle}`}>
          <IconButton
            aria-label="back"
            icon={<Box as={BiArrowBack} boxSize="20px" />}
            variant="ghost"
            m={2}
          />
        </NextLink>
        <Stack spacing={0} w="100%">
          <Heading as="h1" fontSize="md" noOfLines={1} maxW="90%">
            {user.name}
          </Heading>
          <Text fontSize="xs" color="gray.400">
            @{user.handle}
          </Text>
        </Stack>
      </HStack>

      {/* TABS */}
      <Box borderBottom="1px" borderColor={borderColor}>
        <Flex overflowX="scroll" sx={{ "&::-webkit-scrollbar": { display: "none" } }}>
          <CustomTab href={`/${user.handle}/followers`}>Followers</CustomTab>
          <CustomTab href={`/${user.handle}/following`}>Following</CustomTab>
        </Flex>
      </Box>

      {/* CONTENT */}
      <Box>{children}</Box>
    </Box>
  )
}
