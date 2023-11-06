import * as React from "react"
import { BrowserView, MobileView } from "react-device-detect"
import type { IconType } from "react-icons"
import { AiOutlineHeart } from "react-icons/ai"
import { FaCircle, FaRegComment } from "react-icons/fa"
import { FiMail } from "react-icons/fi"
import { RiUserFollowLine } from "react-icons/ri"
import { gql } from "@apollo/client"
import {
  Avatar,
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import Head from "next/head"
import NextLink from "next/link"

import type { NotificationItemFragment } from "lib/graphql"
import {
  GetNotificationsDocument,
  NotificationStatus,
  NotificationType,
  SortOrder,
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { withAuth } from "components/hoc/withAuth"
import { HEADING_CONTAINER_HEIGHT, HomeLayout, TAB_HEIGHT, TOTAL_HEADER_HEIGHT } from "components/HomeLayout"
import { MOBILE_BOTTOM_TAB_HEIGHT } from "components/MobileBottomTabs"
import { MobileTopBarAvatar } from "components/MobileTopBarAvatar"

const _ = gql`
  fragment NotificationItem on Notification {
    id
    type
    status
    initiator {
      id
      avatar
      name
      handle
    }
    message {
      id
      text
      sender {
        id
        avatar
        name
      }
    }
    post {
      id
      text
    }
    reply {
      id
      text
    }
  }
  query GetNotifications($orderBy: [NotificationOrderByWithRelationInput!], $where: NotificationWhereInput) {
    notifications(orderBy: $orderBy, where: $where) {
      items {
        ...NotificationItem
      }
      count
    }
  }
  mutation MarkNotificationAsRead($id: String!) {
    markAsRead(id: $id)
  }
`

function Notifications() {
  const { me, loading } = useMe()
  const [unreadOnly, setUnreadOnly] = React.useState(true)

  const { data, loading: notificationsLoading } = useGetNotificationsQuery({
    variables: {
      orderBy: { createdAt: SortOrder.Desc },
      where: { status: unreadOnly ? { equals: NotificationStatus.Unread } : undefined },
    },
  })

  const notifications = data?.notifications.items || []

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)
  const borderColor = useColorModeValue("gray.100", "gray.700")
  const tabActiveColor = useColorModeValue("black", "white")
  const tabInactiveColor = useColorModeValue("gray.600", "gray.500")

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
        <title>Notifications / Twatter</title>
      </Head>

      {/* Shared underlay that provides blurred background */}
      <Box
        position="fixed"
        left={0}
        top={0}
        h={TOTAL_HEADER_HEIGHT}
        w="100%"
        backdropFilter="blur(10px)"
        bg={bgColor}
        zIndex={1}
      />

      <BrowserView>
        <Box position="fixed" top={0} left={0} h={HEADING_CONTAINER_HEIGHT} zIndex={1} pt={4} pl={4}>
          <Heading fontSize="xl">Notifications</Heading>
        </Box>
      </BrowserView>

      {/* <Box
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
      > */}
      {/* <BrowserView>
          <Box position="fixed" top={0} left={0} h={HEADING_CONTAINER_HEIGHT} zIndex={1} pt={4} pl={4}>
            <Heading fontSize="xl">Notifications</Heading>
          </Box>
        </BrowserView> */}

      <MobileView>
        <Box position="fixed" top={0} left={0} h={HEADING_CONTAINER_HEIGHT} zIndex={1} pt={2} px={4} w="100%">
          <HStack justify="space-between">
            <HStack position="relative" spacing={6}>
              <MobileTopBarAvatar />
              <Heading fontSize="lg">Notifications</Heading>
            </HStack>
            {/* <NextLink
                href="/settings/privacy/messages" // TODO notification settings
              >
                <Icon as={FiSettings} />
              </NextLink> */}
          </HStack>
        </Box>
      </MobileView>

      <Tabs h={TAB_HEIGHT} pt={TOTAL_HEADER_HEIGHT}>
        <Box borderBottom="1px" borderColor={borderColor} pb={1}>
          <TabList
            border="none"
            position="fixed"
            left={0}
            top={HEADING_CONTAINER_HEIGHT}
            zIndex={1}
            w="100%"
            justifyContent="space-evenly"
          >
            <Tab
              fontWeight="medium"
              fontSize="sm"
              _selected={{ color: tabActiveColor, borderColor: "brand.blue", borderBottomWidth: "3.5px" }}
              color={tabInactiveColor}
              px={1}
              onClick={() => setUnreadOnly(true)}
            >
              Unread
            </Tab>
            <Tab
              fontWeight="medium"
              fontSize="sm"
              _selected={{ color: tabActiveColor, borderColor: "brand.blue", borderBottomWidth: "3.5px" }}
              color={tabInactiveColor}
              px={1}
              onClick={() => setUnreadOnly(false)}
            >
              All
            </Tab>
          </TabList>
        </Box>
        <TabPanels pb={MOBILE_BOTTOM_TAB_HEIGHT + "px"}>
          <TabPanel p={0}>
            {notificationsLoading ? (
              <Center pt={8}>
                <Spinner />
              </Center>
            ) : notifications.length === 0 ? (
              <Center p={6}>
                <Stack>
                  <Heading>Nothing to see here - yet</Heading>
                  <Text fontSize="sm" color="gray.400">
                    Likes, mentions, follows, and a whole lot more
                  </Text>
                </Stack>
              </Center>
            ) : (
              notifications.map((notification, i) => <NotificationItem key={i} notification={notification} />)
            )}
          </TabPanel>
          <TabPanel p={0}>
            {notificationsLoading ? (
              <Center pt={8}>
                <Spinner />
              </Center>
            ) : notifications.length === 0 ? (
              <Center p={6}>
                <Stack>
                  <Heading>Nothing to see here - yet</Heading>
                  <Text fontSize="sm" color="gray.400">
                    Likes, mentions, follows, and a whole lot more
                  </Text>
                </Stack>
              </Center>
            ) : (
              notifications.map((notification, i) => <NotificationItem key={i} notification={notification} />)
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

Notifications.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>

export default withAuth(Notifications)

interface Props {
  notification: NotificationItemFragment
}

function NotificationItem({ notification }: Props) {
  const handler = useMutationHandler()
  const bgHover = useColorModeValue("gray.50", "#182234")
  const borderColor = useColorModeValue("gray.100", "gray.700")

  const [markAsRead] = useMarkNotificationAsReadMutation({
    refetchQueries: [{ query: GetNotificationsDocument }],
  })

  const handleClick = () => {
    return handler(() => markAsRead({ variables: { id: notification.id } }))
  }

  let href: string
  let icon: IconType | undefined
  let heading: string
  let content: string | undefined

  switch (notification.type) {
    case NotificationType.NewFollow:
      href = `/${notification.initiator.handle}`
      icon = RiUserFollowLine
      heading = "started following you"
      break
    case NotificationType.NewLike:
      href = `/posts/${notification.post?.id}`
      icon = AiOutlineHeart
      heading = "liked your post"
      content = notification.post?.text
      break
    // case NotificationType.NewMention:
    //   if (notification.post?.id) {
    //     href = `/posts/${notification.post.id}`
    //   } else {
    //     href = `/replies/${notification.reply?.id}`
    //   }
    //   icon = MdOutlineAlternateEmail
    //   heading = `mentioned you in their ${notification.post ? "post" : "reply"}`
    //   content = notification.post.text
    //   break
    case NotificationType.NewMessage:
      href = `/messages/${notification.message?.sender.id}`
      icon = FiMail
      heading = "sent you a message"
      content = notification.message?.text
      break
    case NotificationType.NewReply:
      href = `/posts/${notification.post?.id}`
      icon = FaRegComment
      heading = "replied to your post"
      content = notification.reply?.text
      break
    default:
      href = ""
      icon = undefined
      heading = ""
      content = ""
      break
  }

  const isRead = notification.status === NotificationStatus.Unread
  if (!href || !icon || !heading) return null
  return (
    <Box borderBottom="1px" borderColor={borderColor} onClick={handleClick} _hover={{ bg: bgHover }}>
      <NextLink href={href}>
        <HStack justify="space-between" align="flex-start" pl={10} pr={4} py={3}>
          <HStack align="flex-start" spacing={3}>
            <Icon as={icon} boxSize="22px" mt={1} color="gray.400" />
            <Stack spacing={1}>
              <Avatar src={notification.initiator.avatar || undefined} boxSize="30px" />
              <Text fontSize="sm">
                <Text as="span" fontWeight="medium">
                  {notification.initiator.name}
                </Text>{" "}
                {heading}
              </Text>
              {content && (
                <Text fontSize="sm" color="gray.400" noOfLines={3}>
                  {content}
                </Text>
              )}
            </Stack>
          </HStack>
          {isRead && <Icon as={FaCircle} color="brand.blue" boxSize="12px" m={1} />}
        </HStack>
      </NextLink>
    </Box>
  )
}
