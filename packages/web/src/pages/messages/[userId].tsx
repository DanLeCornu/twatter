import * as React from "react"
import { BrowserView, MobileView } from "react-device-detect"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { BiArrowBack, BiSend } from "react-icons/bi"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { gql } from "@apollo/client"
import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import dayjs from "dayjs"
import Head from "next/head"
import NextLink from "next/link"
import { useRouter } from "next/router"

import type { MessageItemFragment } from "lib/graphql"
import { GetMyConversationsDocument } from "lib/graphql"
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
import { MessageMenu } from "components/MessageMenu"
import type { DisclosureProps } from "components/ProfileMenu"

const _ = gql`
  fragment MessageItem on Message {
    id
    senderId
    receiverId
    text
    createdAt
  }
  query GetMyMessages($orderBy: [MessageOrderByWithRelationInput!]!, $userId: String!) {
    myMessages(orderBy: $orderBy, userId: $userId) {
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
    handle
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
  const disclosureProps = useDisclosure()
  const handler = useMutationHandler()
  const userId = router.query.userId as string
  const newConversation = router.query.newConversation as string
  const isNewConversation = newConversation === "true"
  const [text, setText] = React.useState("")
  const [selectedMessage, setSelectedMessage] = React.useState<MessageItemFragment | undefined>()

  const { data } = useGetUserMessageQuery({ variables: { where: { id: { equals: userId } } } })

  const user = data?.user

  const [send, { loading: sendLoading }] = useSendMessageMutation({
    refetchQueries: [
      {
        query: GetMyMessagesDocument,
        variables: {
          userId,
          orderBy: { createdAt: SortOrder.Asc },
        },
      },
      { query: GetMyConversationsDocument },
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

  const {
    data: messagesData,
    loading,
    refetch,
  } = useGetMyMessagesQuery({
    variables: {
      userId,
      orderBy: { createdAt: SortOrder.Asc },
    },
  })

  const messages = React.useMemo(() => messagesData?.myMessages.items || [], [messagesData])

  React.useEffect(() => {
    if (isNewConversation) return
    if (!loading && messages.length === 0) {
      router.replace("/messages")
    }
  }, [messages, router, loading, isNewConversation])

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

  // TODO: find a proper solution instead of this hack, also doesn't seem to work on desktop
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
            pr={3}
            w="100%"
          >
            <HStack justify="space-between" w="100%" align="baseline">
              <HStack position="relative" spacing={3} w="calc(100% - 28px)">
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
              <NextLink href={`/${user?.handle}`}>
                <Icon boxSize="20px" as={AiOutlineInfoCircle} />
              </NextLink>
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
              selectedMessage={selectedMessage}
              setSelectedMessage={setSelectedMessage}
              disclosureProps={disclosureProps}
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
            placeholder="Start a new message"
          />
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

      {/* MESSAGE MENU */}
      <MessageMenu message={selectedMessage} disclosureProps={disclosureProps} refetch={refetch} />
    </Box>
  )
}

export default withAuth(UserMessages)

interface GroupedMessagesProps {
  timestamp: string
  currentUserId: string
  groupedMessages: MessageItemFragment[]
  selectedMessage?: MessageItemFragment
  setSelectedMessage: React.Dispatch<React.SetStateAction<MessageItemFragment>>
  disclosureProps: DisclosureProps
}

function GroupedMessages({
  timestamp,
  currentUserId,
  groupedMessages,
  selectedMessage,
  setSelectedMessage,
  disclosureProps,
}: GroupedMessagesProps) {
  const isFromMe = groupedMessages[0].senderId === currentUserId
  return (
    <Stack spacing={1}>
      <Stack spacing={2}>
        {groupedMessages.map((message, i) => (
          <MessageItem
            key={i}
            isFromMe={isFromMe}
            message={message}
            selectedMessage={selectedMessage}
            setSelectedMessage={setSelectedMessage}
            disclosureProps={disclosureProps}
          />
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
  selectedMessage?: MessageItemFragment
  setSelectedMessage: React.Dispatch<React.SetStateAction<MessageItemFragment>>
  disclosureProps: DisclosureProps
}

function MessageItem({
  isFromMe,
  message,
  selectedMessage,
  setSelectedMessage,
  disclosureProps,
}: MessageItemProps) {
  const isSelected = selectedMessage?.id === message.id
  return (
    <Flex
      onClick={() => setSelectedMessage(message)}
      _last={{
        div: {
          div: {
            borderBottomRightRadius: isFromMe ? "4px" : undefined,
            borderBottomLeftRadius: !isFromMe ? "4px" : undefined,
          },
        },
      }}
    >
      <HStack w="100%" justify={isFromMe ? "flex-end" : "flex-start"}>
        {isSelected && isFromMe && (
          <IconButton
            aria-label="open menu"
            variant="ghost"
            boxSize="25px"
            minW="25px" // needed otherwise Chakra default styling overrides and makes it wider
            icon={<Box as={HiOutlineDotsHorizontal} boxSize="18px" color="gray.400" />}
            onClick={disclosureProps.onOpen}
          />
        )}
        <Stack maxW="80%" px={4} py={2} rounded="3xl" bg={isFromMe ? "brand.blue" : "gray.500"}>
          <Text fontSize="sm">{message.text}</Text>
        </Stack>
        {isSelected && !isFromMe && (
          <IconButton
            aria-label="open menu"
            variant="ghost"
            boxSize="25px"
            minW="25px" // needed otherwise Chakra default styling overrides and makes it wider
            icon={<Box as={HiOutlineDotsHorizontal} boxSize="18px" color="gray.400" />}
            onClick={disclosureProps.onOpen}
          />
        )}
      </HStack>
    </Flex>
  )
}
