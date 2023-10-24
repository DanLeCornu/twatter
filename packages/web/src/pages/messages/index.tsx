import * as React from "react"
import { BrowserView, MobileView } from "react-device-detect"
import {
  Avatar,
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

import { useMe } from "lib/hooks/useMe"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { withAuth } from "components/hoc/withAuth"
import { HEADING_CONTAINER_HEIGHT, HomeLayout } from "components/HomeLayout"
import { MobileTopBarAvatar } from "components/MobileTopBarAvatar"
import { gql } from "@apollo/client"
import { ConversationItemFragment, useMyConversationsQuery } from "lib/graphql"
import NextLink from "next/link"
import { postTimeFromNow } from "lib/helpers/utils"
import { HiOutlineDotsHorizontal } from "react-icons/hi"

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
  fragment ConversationItem on Conversation {
    id
    user {
      ...ConversationUserItem
    }
    messages {
      ...ConversationMessageItem
    }
  }
  query MyConversations {
    myConversations {
      items {
        ...ConversationItem
      }
      count
    }
  }
`

function Messages() {
  const { me, loading } = useMe()

  const { data, loading: conversationsLoading } = useMyConversationsQuery()

  const conversations = data?.myConversations.items || []

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)
  const borderColor = useColorModeValue("gray.100", "gray.700")

  if (loading)
    return (
      <Center>
        <Spinner />
      </Center>
    )
  if (!me) return null
  return (
    <Box>
      <Head>
        <title>Settings / Twatter</title>
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
        borderBottom="1px"
        borderColor={borderColor}
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
            px={4}
            w="100%"
          >
            <HStack position="relative" spacing={6}>
              <MobileTopBarAvatar />
              <Heading fontSize="lg">Messages</Heading>
            </HStack>
          </Box>
        </MobileView>
      </Box>

      <Stack mt={HEADING_CONTAINER_HEIGHT + "px"} py={2} px={4}>
        {conversationsLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          conversations.map((conversation, i) => <ConversationItem key={i} conversation={conversation} />)
        )}
      </Stack>
    </Box>
  )
}

Messages.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>

export default withAuth(Messages)

interface Props {
  conversation: ConversationItemFragment
}

function ConversationItem({ conversation }: Props) {
  const bgHover = useColorModeValue("gray.50", "#182234")
  const latestMessage = conversation.messages[conversation.messages.length - 1]
  return (
    <NextLink href={`/messages/${conversation.user.id}`}>
      <HStack _hover={{ bg: bgHover }}>
        <Avatar src={conversation.user.avatar || undefined} boxSize="40px" />
        <HStack justify="space-between" w="100%" border="1px">
          <Stack
            spacing={0}
            // w="calc(100% - 35px)"
            w="100%"
            border="1px"
          >
            {/* <Box 
            w="calc(100% - 45px)"
            > */}
            <HStack w="calc(100% - 90px)" border="1px">
              <Text fontWeight="bold" fontSize="sm" isTruncated>
                {conversation.user.name}
              </Text>
              <Text color="gray.400" fontSize="sm" isTruncated>
                @{conversation.user.handle}
              </Text>
              <Text color="gray.400" fontSize="sm" flexShrink={0}>
                <Text as="span" mr={1}>
                  &#183;
                </Text>
                {postTimeFromNow(latestMessage.createdAt)}
              </Text>
            </HStack>
            {/* </Box> */}
            <Text color="gray.400" fontSize="sm" isTruncated w="calc(100% - 90px)" border="1px">
              {latestMessage.text}
            </Text>
          </Stack>
          <IconButton
            border="1px"
            aria-label="open menu"
            variant="ghost"
            boxSize="35px"
            minW="35px" // needed otherwise Chakra default styling overrides and makes it wider
            icon={<Box as={HiOutlineDotsHorizontal} boxSize="20px" color="gray.400" />}
            onClick={(e) => {
              e.preventDefault() // Stops Next link
              // drawerProps.onOpen()
            }}
          />
        </HStack>
      </HStack>
    </NextLink>
  )
}
