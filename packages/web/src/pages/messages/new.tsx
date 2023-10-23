import * as React from "react"
import { BrowserView, MobileView } from "react-device-detect"
import { BiSearch, BiX } from "react-icons/bi"
import { CgClose } from "react-icons/cg"
import { gql } from "@apollo/client"
import type { InputProps } from "@chakra-ui/react"
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"

import { QueryMode, useGetSearchUsersQuery, useMyConversationsQuery } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { withAuth } from "components/hoc/withAuth"
import { HEADING_CONTAINER_HEIGHT } from "components/HomeLayout"
import { UserSearchItem } from "components/UserSearchItem"

const _ = gql`
  fragment ConversationUserItem on User {
    id
    name
    handle
    avatar
  }
  fragment ConversationMessageItem on ConversationMessage {
    id
    senderId
    receiverId
    text
    createdAt
  }
  query MyConversations {
    myConversations {
      items {
        id
        user {
          ...ConversationUserItem
        }
        messages {
          ...ConversationMessageItem
        }
      }
      count
    }
  }
`

function NewMessage() {
  const { me } = useMe()
  const router = useRouter()
  const [search, setSearch] = React.useState("")

  const { data, loading } = useMyConversationsQuery()

  const conversations = data?.myConversations.items || []

  const { data: userData, loading: userLoading } = useGetSearchUsersQuery({
    variables: {
      take: 10,
      where: {
        id: { not: { equals: me?.id } },
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

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)

  return (
    <Box>
      <Head>
        <title>Messages / Twatter</title>
      </Head>
      <Box
        position="fixed"
        top={0}
        left={0}
        w="100%"
        h={HEADING_CONTAINER_HEIGHT + "px"}
        zIndex={1}
        p={2}
        backdropFilter="blur(10px)"
        bgColor={bgColor}
      >
        <BrowserView>
          <Box position="fixed" top={0} left={0} h={HEADING_CONTAINER_HEIGHT} zIndex={1} pt={4} pl={4}>
            <Heading fontSize="xl">Messages</Heading>
          </Box>
        </BrowserView>

        <MobileView>
          <Box
            position="fixed"
            top={0}
            left={0}
            h={HEADING_CONTAINER_HEIGHT}
            zIndex={1}
            pt={2}
            px={2}
            w="100%"
          >
            <HStack position="relative" spacing={4}>
              <IconButton
                icon={<Box as={CgClose} boxSize="20px" />}
                aria-label="close"
                variant="ghost"
                onClick={() => router.back()}
              />
              <Heading fontSize="lg">New message</Heading>
            </HStack>
          </Box>
        </MobileView>
      </Box>

      <Stack mt={HEADING_CONTAINER_HEIGHT + "px"} py={2}>
        <Box px={2}>
          <NewMessageSearch search={search} setSearch={setSearch} />
        </Box>
        <Divider />
        {!!search ? (
          userLoading ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            users.map((user, i) => (
              <UserSearchItem key={i} user={user} size="small" path={`/messages/${user.id}`} />
            ))
          )
        ) : loading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          conversations.map((conversation, i) => (
            <UserSearchItem
              key={i}
              user={conversation.user}
              size="small"
              path={`/messages/${conversation.user.id}`}
            />
          ))
        )}
      </Stack>
    </Box>
  )
}

export default withAuth(NewMessage)

interface Props extends InputProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

function NewMessageSearch({ search, setSearch, ...props }: Props) {
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
        placeholder="Search people"
        fontSize="15px"
        border="none"
        variant="unstyled"
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
