import * as React from "react"
import { BrowserView, MobileView } from "react-device-detect"
import { BiArrowBack, BiSend } from "react-icons/bi"
import { gql } from "@apollo/client"
import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react"
import dayjs from "dayjs"
import Head from "next/head"
import { useRouter } from "next/router"

import type { MessageItemFragment } from "lib/graphql"
import {
  GetMyMessagesDocument,
  SortOrder,
  useGetMyMessagesQuery,
  useGetUserMessageQuery,
  useSendMessageMutation,
} from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { withAuth } from "components/hoc/withAuth"
import { HEADING_CONTAINER_HEIGHT } from "components/HomeLayout"

const _ = gql`
  fragment MessageItem on Message {
    id
    senderId
    receiverId
    text
    createdAt
  }
  query GetMyMessages($orderBy: [MessageOrderByWithRelationInput!], $where: MessageWhereInput) {
    myMessages(orderBy: $orderBy, where: $where) {
      items {
        ...MessageItem
      }
      count
    }
  }
  fragment UserMessage on User {
    id
    name
    avatar
  }
  query GetUserMessage($where: UserWhereInput!) {
    user(where: $where) {
      ...UserMessage
    }
  }
  mutation SendMessage($data: CreateMessageInput!) {
    createMessage(data: $data)
  }
`

function UserMessages() {
  const { me } = useMe()
  const router = useRouter()
  const handler = useMutationHandler()
  const userId = router.query.userId as string
  const [text, setText] = React.useState("")

  const { data } = useGetUserMessageQuery({ variables: { where: { id: { equals: userId } } } })

  const user = data?.user

  const [send, { loading: sendLoading }] = useSendMessageMutation({
    refetchQueries: [
      {
        query: GetMyMessagesDocument,
        variables: {
          where: {
            OR: [
              { AND: [{ senderId: { equals: me?.id } }, { receiverId: { equals: userId } }] },
              { AND: [{ senderId: { equals: userId } }, { receiverId: { equals: me?.id } }] },
            ],
          },
          orderBy: { createdAt: SortOrder.Asc },
        },
      },
    ],
  })

  const handleSubmit = () => {
    if (!text.trim()) {
      setText("")
      return
    }
    return handler(() => send({ variables: { data: { receiverId: userId, text: text } } }), {
      onSuccess: () => {
        setText("")
      },
    })
  }

  const { data: messagesData, loading } = useGetMyMessagesQuery({
    variables: {
      where: {
        OR: [
          { AND: [{ senderId: { equals: me?.id } }, { receiverId: { equals: userId } }] },
          { AND: [{ senderId: { equals: userId } }, { receiverId: { equals: me?.id } }] },
        ],
      },
      orderBy: { createdAt: SortOrder.Asc },
    },
  })

  const messages = messagesData?.myMessages.items || []

  const groupedMessages = messages.reduce((acc, message) => {
    const key = message.senderId + "_" + dayjs(message.createdAt).format("YYYY-MM-DD HH:mm")
    if (acc[key]) {
      acc[key].push(message)
    } else {
      acc[key] = [message]
    }
    return acc
  }, {} as { [date: string]: MessageItemFragment[] })

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)
  const borderColor = useColorModeValue("gray.100", "gray.700")

  // TODO: find a proper solution instead of this hack, akso doesn't seem tot work on desktop
  window.scrollTo(0, document.body.scrollHeight + 10000) // add 10000px more than scroll height to force it to the bottom on load

  const MESSAGE_INPUT_HEIGHT = 60

  if (!me) return null
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
            pl={2}
            pr={8}
            w="100%"
          >
            <HStack position="relative" spacing={3}>
              <IconButton
                aria-label="back"
                icon={<Box as={BiArrowBack} boxSize="20px" />}
                variant="ghost"
                onClick={() => router.back()}
              />
              <Avatar src={user?.avatar || undefined} boxSize="28px" />
              <Heading fontSize="md" isTruncated>
                {user?.name}
              </Heading>
            </HStack>
          </Box>
        </MobileView>
      </Box>

      <Stack mt={HEADING_CONTAINER_HEIGHT + "px"} mb={MESSAGE_INPUT_HEIGHT + "px"} py={2} px={4} spacing={4}>
        {loading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          Object.entries(groupedMessages).map(([key, groupedMessages]) => (
            <GroupedMessages
              key={key}
              timestamp={key.split("_")[1]}
              currentUserId={me.id}
              groupedMessages={groupedMessages}
            />
          ))
        )}
      </Stack>

      <Box
        borderTop="1px"
        borderColor={borderColor}
        position="fixed"
        bottom={0}
        left={0}
        w="100%"
        bg="brand.bgDark"
        h={MESSAGE_INPUT_HEIGHT + "px"}
      >
        <HStack mx={3} my={2} pl={1} bg="gray.700" rounded="2xl">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={1}
            fontSize="sm"
            border="none"
            variant="unstyled"
            px={3}
          />
          {/* Fix the jank where you sometimes can't click the button for some reason */}
          <IconButton
            aria-label="send message"
            icon={<Box as={BiSend} boxSize="22px" color="brand.blue" />}
            variant="ghost"
            boxSize="34px"
            minW="34px"
            m={1}
            onClick={handleSubmit}
            isDisabled={sendLoading}
          />
        </HStack>
      </Box>
    </Box>
  )
}

export default withAuth(UserMessages)

interface GroupedMessagesProps {
  timestamp: string
  currentUserId: string
  groupedMessages: MessageItemFragment[]
}

function GroupedMessages({ timestamp, currentUserId, groupedMessages }: GroupedMessagesProps) {
  const isFromMe = groupedMessages[0].senderId === currentUserId
  return (
    <Stack spacing={1}>
      <Stack spacing={2}>
        {groupedMessages.map((message, i) => (
          <MessageItem key={i} isFromMe={isFromMe} message={message} />
        ))}
      </Stack>
      <Text color="gray.400" fontSize="xs" textAlign={isFromMe ? "right" : "left"}>
        {dayjs(timestamp).format("MMM D, YYYY, h:mm A")}
      </Text>
    </Stack>
  )
}

interface MessageItemProps {
  isFromMe: boolean
  message: MessageItemFragment
}

function MessageItem({ isFromMe, message }: MessageItemProps) {
  return (
    <Flex
      justify={isFromMe ? "flex-end" : "flex-start"}
      _last={{
        div: {
          div: {
            borderBottomRightRadius: isFromMe ? "4px" : undefined,
            borderBottomLeftRadius: !isFromMe ? "4px" : undefined,
          },
        },
      }}
    >
      <Stack w="80%" spacing={1}>
        <Stack px={4} py={2} rounded="3xl" bg={isFromMe ? "brand.blue" : "gray.500"}>
          <Text fontSize="sm">{message.text}</Text>
        </Stack>
      </Stack>
    </Flex>
  )
}
