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
  useDisclosure,
} from "@chakra-ui/react"
import Head from "next/head"

import { useMe } from "lib/hooks/useMe"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { withAuth } from "components/hoc/withAuth"
import { HEADING_CONTAINER_HEIGHT, HomeLayout } from "components/HomeLayout"
import { MobileTopBarAvatar } from "components/MobileTopBarAvatar"
import { gql } from "@apollo/client"
import { ConversationItemFragment, useGetMyConversationsQuery } from "lib/graphql"
import NextLink from "next/link"
import { postTimeFromNow } from "lib/helpers/utils"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { ConversationMenu } from "components/ConversationMenu"

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
  query GetMyConversations {
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
  const drawerProps = useDisclosure()
  const menuProps = useDisclosure()
  const [selectedConversation, setSelectedConversation] = React.useState<
    ConversationItemFragment | undefined
  >()

  const { data, loading: conversationsLoading } = useGetMyConversationsQuery()

  const conversations = data?.myConversations.items || []

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)
  const borderColor = useColorModeValue("gray.100", "gray.700")

  const handleOpenMenu = (conversation: ConversationItemFragment) => {
    setSelectedConversation(conversation)
    drawerProps.onOpen()
    menuProps.onOpen()
  }

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
          conversations.map((conversation, i) => (
            <ConversationItem key={i} conversation={conversation} handleOpenMenu={handleOpenMenu} />
          ))
        )}
      </Stack>

      <ConversationMenu drawerProps={drawerProps} menuProps={menuProps} conversation={selectedConversation} />
    </Box>
  )
}

Messages.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>

export default withAuth(Messages)

interface Props {
  conversation: ConversationItemFragment
  handleOpenMenu: (conversation: ConversationItemFragment) => void
}

function ConversationItem({ conversation, handleOpenMenu }: Props) {
  const bgHover = useColorModeValue("gray.50", "#182234")
  const latestMessage = conversation.messages[conversation.messages.length - 1]
  return (
    <NextLink href={`/messages/${conversation.user.id}`}>
      <HStack _hover={{ bg: bgHover }}>
        <Avatar src={conversation.user.avatar || undefined} boxSize="40px" />
        <HStack
          justify="space-between"
          align="flex-start"
          w="calc(100% - 48px)" // 40px avatar boxSize + 8px HStack spacing
          spacing={2}
        >
          <Stack
            spacing={0}
            w="calc(100% - 33px)" // 25px menu button boxSize + 8px HStack spacing
            py={1}
          >
            <HStack spacing={0}>
              <Text fontWeight="bold" fontSize="sm" mr={2} isTruncated>
                {conversation.user.name}
              </Text>
              <Text color="gray.400" fontSize="sm" mr={1} isTruncated>
                @{conversation.user.handle}
              </Text>
              <Text color="gray.400" fontSize="sm" flexShrink={0}>
                <Text as="span" mr={1}>
                  &#183;
                </Text>
                {postTimeFromNow(latestMessage.createdAt)}
              </Text>
            </HStack>
            <Text color="gray.400" fontSize="sm" isTruncated>
              {latestMessage.text}
            </Text>
          </Stack>
          <IconButton
            aria-label="open menu"
            variant="ghost"
            boxSize="25px"
            minW="25px" // needed otherwise Chakra default styling overrides and makes it wider
            icon={<Box as={HiOutlineDotsHorizontal} boxSize="18px" color="gray.400" />}
            onClick={(e) => {
              e.preventDefault() // Stops Next link
              handleOpenMenu(conversation)
            }}
          />
        </HStack>
      </HStack>
    </NextLink>
  )
}
