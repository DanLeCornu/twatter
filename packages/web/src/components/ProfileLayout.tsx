import * as React from "react"
import { gql } from "@apollo/client"
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import dayjs from "dayjs"
import { ArrowLeft, Cake, CalendarDays, Link2, Mail, MapPin } from "lucide-react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import {
  DobPrivacy,
  GetPostsDocument,
  MeDocument,
  SortOrder,
  useBlockUserMutation,
  useGetProfileQuery,
  useMuteUserMutation,
  useUnblockUserMutation,
  useUnmuteUserMutation,
} from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"

import { CustomTab } from "./CustomTab"
import { FollowButton } from "./FollowButton"
import { Modal } from "./Modal"
import { ProfileMenu } from "./ProfileMenu"
import { ProfileNotFound } from "./ProfileNotFound"

const _ = gql`
  fragment UserProfile on User {
    id
    name
    handle
    avatar
    cover
    bio
    location
    website
    dob
    dobDayMonthPrivacy
    dobYearPrivacy
    createdAt
    postCount
    followerCount
    followingCount
    posts {
      id
      text
      createdAt
      replyCount
      likeCount
      viewCount
    }
  }
  query GetProfile($where: UserWhereInput!) {
    user(where: $where) {
      ...UserProfile
    }
  }
  mutation UnmuteUser($userId: String!) {
    unmuteUser(userId: $userId)
  }
  mutation UnblockUser($userId: String!) {
    unblockUser(userId: $userId)
  }
`

export function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { me } = useMe()
  const router = useRouter()
  const drawerProps = useDisclosure()
  const handler = useMutationHandler()
  const muteModalProps = useDisclosure()
  const blockModalProps = useDisclosure()
  const avatarModalProps = useDisclosure()
  const handle = router.query.handle as string

  const [showBlockedPosts, setShowBlockedPosts] = React.useState(false)

  const { data, loading } = useGetProfileQuery({
    variables: { where: { handle: { equals: handle } } },
  })
  const user = data?.user

  const borderColor = useColorModeValue("gray.100", "gray.700")

  const isMuted =
    (user && me?.mutedAccounts.map((mutedAccount) => mutedAccount.id).includes(user.id)) || false
  const isBlocked =
    (user && me?.blockedAccounts.map((blockedAccount) => blockedAccount.id).includes(user.id)) || false

  const [mute, { loading: muteLoading }] = useMuteUserMutation({
    refetchQueries: [
      { query: MeDocument },
      {
        query: GetPostsDocument,
        variables: { orderBy: { createdAt: SortOrder.Desc }, where: { userId: { not: { equals: me?.id } } } },
      },
    ],
  })
  const [unmute, { loading: unmuteLoading }] = useUnmuteUserMutation({
    refetchQueries: [{ query: MeDocument }],
  })

  const [block, { loading: blockLoading }] = useBlockUserMutation({
    refetchQueries: [
      { query: MeDocument },
      {
        query: GetPostsDocument,
        variables: { orderBy: { createdAt: SortOrder.Desc }, where: { userId: { not: { equals: me?.id } } } },
      },
    ],
  })
  const [unblock, { loading: unblockLoading }] = useUnblockUserMutation({
    refetchQueries: [{ query: MeDocument }],
  })

  const handleMute = () => {
    if (!user || muteLoading) return
    return handler(() => mute({ variables: { userId: user.id } }), {
      onSuccess: (_, toast) => {
        drawerProps.onClose()
        toast({
          description: `@${handle} has been muted`,
          action: (
            <Link fontWeight="medium" color="white" fontSize="sm" onClick={handleUnmute}>
              Undo
            </Link>
          ),
        })
        muteModalProps.onClose()
      },
    })
  }
  const handleUnmute = () => {
    if (!user || unmuteLoading) return
    return handler(() => unmute({ variables: { userId: user.id } }), {
      onSuccess: (_, toast) => {
        toast({ description: `@${handle} has been unmuted` })
        muteModalProps.onClose()
        drawerProps.onClose()
      },
    })
  }

  const handleUnblock = () => {
    if (!user || unblockLoading) return
    return handler(() => unblock({ variables: { userId: user.id } }), {
      onSuccess: () => {
        blockModalProps.onClose()
        drawerProps.onClose()
      },
    })
  }

  const handleBlock = () => {
    if (!user || blockLoading) return
    return handler(() => block({ variables: { userId: user.id } }), {
      onSuccess: (_, toast) => {
        drawerProps.onClose()
        toast({
          description: "Successfully blocked",
          action: (
            <Link fontWeight="medium" color="white" fontSize="sm" onClick={handleUnblock}>
              Unblock
            </Link>
          ),
        })
        blockModalProps.onClose()
      },
    })
  }

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)

  const websiteUrl = user?.website
    ? user.website.startsWith("https://") || user.website.startsWith("http://")
      ? user.website
      : `https://${user.website}`
    : ""

  if (loading && !user)
    return (
      <Center minH="80vh">
        <Spinner />
      </Center>
    )
  if (!user) return <ProfileNotFound />
  return (
    <Box>
      <Flex
        w="100%"
        maxW="100vw"
        h="56px"
        position="fixed"
        backdropFilter="blur(10px)"
        bgColor={bgColor}
        zIndex={1}
      >
        {/* <NextLink href="/home">
          <IconButton
            aria-label="back"
            icon={<Box as={BiArrowBack} boxSize="20px" />}
            variant="ghost"
            m={2}
          />
        </NextLink> */}
        {/* Can't decide for router.back or back to /home always */}
        <IconButton
          aria-label="back"
          icon={<Box as={ArrowLeft} boxSize="20px" />}
          variant="ghost"
          m={2}
          onClick={() => router.back()}
        />
        <Stack px={4} spacing={0} w="100%" justify="center">
          <Heading as="h1" size="md" noOfLines={1} maxW="80%">
            {user.name}
          </Heading>
          <Text fontSize="sm" color="gray.400">
            {user.postCount.toLocaleString() || 0} posts
          </Text>
        </Stack>
      </Flex>
      <Divider />
      <Box position="relative" pt="56px">
        <Box
          w="100%"
          h="115px"
          position="absolute"
          bgImage={user.cover || ""}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          bg={!user.cover ? "gray.600" : undefined}
        />
        <Stack px={4} pt="78px" pb={6} spacing={5}>
          <HStack align="flex-end" justify="space-between">
            <Avatar
              src={user.avatar || undefined}
              boxSize="80px"
              onClick={avatarModalProps.onOpen}
              borderWidth="2px"
              borderColor="brand.bgDark"
            />
            {user.id === me?.id ? (
              <Flex justify="flex-end">
                <NextLink href="/settings/profile">
                  <Button colorScheme="monochrome" variant="outline" size="sm">
                    Edit profile
                  </Button>
                </NextLink>
              </Flex>
            ) : (
              <HStack>
                <ProfileMenu
                  isMuted={isMuted}
                  isBlocked={isBlocked}
                  handle={handle}
                  onOpen={blockModalProps.onOpen}
                  handleMute={handleMute}
                  handleUnmute={handleUnmute}
                  drawerProps={drawerProps}
                />

                {isBlocked ? (
                  <Button
                    bg="red"
                    size="sm"
                    onClick={blockModalProps.onOpen}
                    sx={{
                      "::after": {
                        content: '"Blocked"',
                      },
                      ":hover::after": {
                        content: '"Unblock"',
                      },
                      ":hover": {
                        bg: "red",
                      },
                    }}
                  />
                ) : (
                  <>
                    <IconButton
                      aria-label="message"
                      icon={<Box as={Mail} boxSize="18px" />}
                      variant="outline"
                      boxSize="34px"
                      minW="34px"
                    />
                    <FollowButton userId={user.id} handle={user.handle} defaultShowFollowing />
                  </>
                )}
              </HStack>
            )}
          </HStack>
          <Stack spacing={3}>
            <Stack spacing={0} w="100%">
              <Heading as="h2" size="md">
                {user.name}
              </Heading>
              <Text fontSize="sm" color="gray.400">
                @{user.handle}
              </Text>
            </Stack>
            {!isBlocked && (
              <>
                <Text fontSize="sm">{user.bio}</Text>
                <Flex flexWrap="wrap">
                  {user.location && (
                    <HStack spacing={1} align="baseline" mr={2}>
                      <Icon as={MapPin} color="gray.400" boxSize="14px" />
                      <Text fontSize="sm" color="gray.400">
                        {user.location}
                      </Text>
                    </HStack>
                  )}
                  {user.website && (
                    <HStack spacing={1} align="center" mr={2}>
                      <Icon as={Link2} color="gray.400" boxSize="18px" />
                      <Link isExternal href={websiteUrl}>
                        <Text fontSize="sm">{user.website}</Text>
                      </Link>
                    </HStack>
                  )}
                  {user.dob &&
                    (user.dobDayMonthPrivacy === DobPrivacy.Public ||
                      user.dobYearPrivacy === DobPrivacy.Public) && (
                      <HStack spacing={1} align="center" mr={2}>
                        <Icon as={Cake} color="gray.400" boxSize="16px" />
                        <Text fontSize="sm" color="gray.400">
                          {user.dobDayMonthPrivacy === DobPrivacy.Public &&
                          user.dobYearPrivacy === DobPrivacy.Public
                            ? `Born ${dayjs(user.dob).format("MMMM DD, YYYY")}`
                            : user.dobDayMonthPrivacy === DobPrivacy.Private &&
                              user.dobYearPrivacy === DobPrivacy.Public
                            ? `Born in ${dayjs(user.dob).format("YYYY")}`
                            : user.dobDayMonthPrivacy === DobPrivacy.Public &&
                              user.dobYearPrivacy === DobPrivacy.Private &&
                              `Born on ${dayjs(user.dob).format("MMMM DD")}`}
                        </Text>
                      </HStack>
                    )}
                  <HStack spacing={1} align="baseline">
                    <Icon as={CalendarDays} color="gray.400" boxSize="12px" />
                    <Text fontSize="sm" color="gray.400">
                      Joined {dayjs(user.createdAt).format("MMMM YYYY")}
                    </Text>
                  </HStack>
                </Flex>
              </>
            )}
            <HStack spacing={6}>
              <NextLink href={`/${user.handle}/following`}>
                <Button variant="link" fontWeight="sm" size="sm">
                  <HStack spacing={1}>
                    <Text fontWeight="bold">{user.followingCount.toLocaleString()}</Text>
                    <Text color="gray.400">Following</Text>
                  </HStack>
                </Button>
              </NextLink>
              <NextLink href={`/${user.handle}/followers`}>
                <Button variant="link" fontWeight="sm" size="sm">
                  <HStack spacing={1}>
                    <Text fontWeight="bold">{user.followerCount.toLocaleString()}</Text>
                    <Text color="gray.400">Followers</Text>
                  </HStack>
                </Button>
              </NextLink>
            </HStack>
            {isMuted && (
              <Text color="gray.400" fontSize="sm">
                You have muted posts from this account.{" "}
                <Button variant="link" color="blue.500" fontWeight="medium" onClick={muteModalProps.onOpen}>
                  Unmute
                </Button>
              </Text>
            )}
          </Stack>
        </Stack>
      </Box>

      {/* TABS */}
      {isBlocked && !showBlockedPosts ? (
        <Stack px={4} my={16} spacing={6}>
          <Stack>
            <Heading>@{user.handle} is blocked</Heading>
            <Text color="gray.400" fontSize="sm">
              Are you sure you want to view these posts? Viewing posts won't unblock @{user.handle}.
            </Text>
          </Stack>
          <Flex>
            <Button size="lg" onClick={() => setShowBlockedPosts(true)}>
              View posts
            </Button>
          </Flex>
        </Stack>
      ) : (
        <Box borderBottom="1px" borderColor={borderColor}>
          <Flex overflowX="scroll" sx={{ "&::-webkit-scrollbar": { display: "none" } }}>
            <CustomTab href={`/${user.handle}`}>Posts</CustomTab>
            <CustomTab href={`/${user.handle}/replies`}>Replies</CustomTab>
            <CustomTab href={`/${user.handle}/likes`}>Likes</CustomTab>
          </Flex>
        </Box>
      )}

      {/* CONTENT */}
      {(showBlockedPosts || !isBlocked) && <Box>{children}</Box>}

      {/* BLOCK/UNBLOCK MODAL */}
      <Modal {...blockModalProps} title={`${isBlocked ? "Unblock" : "Block"} @${user.handle}?`}>
        <Text mb={6} fontSize="sm" color="gray.400">
          {isBlocked
            ? "They will be able to follow you and view your posts."
            : `They will not be able to follow you or view your posts, and you will not see posts or notifications from @${user.handle}.`}
        </Text>
        <Stack>
          {isBlocked ? (
            <Button colorScheme="monochrome" onClick={handleUnblock}>
              Unblock
            </Button>
          ) : (
            <Button bg="red" onClick={handleBlock} _hover={{ bg: "red" }}>
              Block
            </Button>
          )}
          <Button colorScheme="monochrome" variant="outline" onClick={blockModalProps.onClose}>
            Cancel
          </Button>
        </Stack>
      </Modal>

      {/* MUTE/UNMUTE MODAL */}
      <Modal {...muteModalProps} title={`${isMuted ? "Unmute" : "Mute"} @${user.handle}?`}>
        <Text mb={6}>
          {isMuted
            ? "Posts from this account will now be allowed in your Home timeline."
            : `They will not be able to follow you or view your posts, and you will not see posts or notifications from @${user.handle}.`}
        </Text>
        <Stack>
          {isMuted ? (
            <Button colorScheme="monochrome" onClick={handleUnmute}>
              Unmute
            </Button>
          ) : (
            <Button bg="red" onClick={handleMute} _hover={{ bg: "red" }}>
              Mute
            </Button>
          )}
          <Button colorScheme="monochrome" variant="outline" onClick={muteModalProps.onClose}>
            Cancel
          </Button>
        </Stack>
      </Modal>

      {/* AVATAR MODAL */}
      <Modal {...avatarModalProps} closeButton>
        <Center h="75vh">
          <AspectRatio ratio={1} w="100%">
            <Avatar src={user.avatar || undefined} />
          </AspectRatio>
        </Center>
      </Modal>
    </Box>
  )
}
