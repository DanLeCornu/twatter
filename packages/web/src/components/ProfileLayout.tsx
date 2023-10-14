import * as React from "react"
import { AiOutlineLink } from "react-icons/ai"
import { BiArrowBack, BiBlock, BiFlag, BiVolumeFull, BiVolumeMute } from "react-icons/bi"
import { BsBalloon, BsCalendar3 } from "react-icons/bs"
import { CgUnblock } from "react-icons/cg"
import { FiMail } from "react-icons/fi"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { SlLocationPin } from "react-icons/sl"
import { gql } from "@apollo/client"
import {
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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Spinner,
  Stack,
  Text,
  useClipboard,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import dayjs from "dayjs"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { WEB_URL } from "lib/config"
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

import { FollowButton } from "./FollowButton"
import { Modal } from "./Modal"
import { NoData } from "./NoData"
import { ProfileTab } from "./ProfileTab"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"

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
  const handler = useMutationHandler()
  const blockModalProps = useDisclosure()
  const muteModalProps = useDisclosure()
  const handle = router.query.handle as string

  const [showBlockedPosts, setShowBlockedPosts] = React.useState(false)

  const { data, loading } = useGetProfileQuery({
    variables: { where: { handle: { equals: handle } } },
  })
  const user = data?.user

  const borderColor = useColorModeValue("gray.100", "gray.700")

  const hasMuted = user && me?.mutedAccounts.map((mutedAccount) => mutedAccount.id).includes(user.id)
  const hasBlocked = user && me?.blockedAccounts.map((blockedAccount) => blockedAccount.id).includes(user.id)

  const [mute, { loading: muteLoading }] = useMuteUserMutation({
    refetchQueries: [
      { query: MeDocument },
      { query: GetPostsDocument, variables: { orderBy: { createdAt: SortOrder.Desc } } },
    ],
  })
  const [unmute, { loading: unmuteLoading }] = useUnmuteUserMutation({
    refetchQueries: [{ query: MeDocument }],
  })
  const [block, { loading: blockLoading }] = useBlockUserMutation({
    refetchQueries: [
      { query: MeDocument },
      { query: GetPostsDocument, variables: { orderBy: { createdAt: SortOrder.Desc } } },
    ],
  })
  const [unblock, { loading: unblockLoading }] = useUnblockUserMutation({
    refetchQueries: [{ query: MeDocument }],
  })
  const handleMute = () => {
    if (!user || muteLoading) return
    return handler(() => mute({ variables: { userId: user.id } }), {
      onSuccess: () => {
        muteModalProps.onClose()
      },
    })
  }
  const handleUnmute = () => {
    if (!user || unmuteLoading) return
    return handler(() => unmute({ variables: { userId: user.id } }), {
      onSuccess: () => {
        muteModalProps.onClose()
      },
    })
  }
  const handleBlock = () => {
    if (!user || blockLoading) return
    return handler(() => block({ variables: { userId: user.id } }), {
      onSuccess: () => {
        blockModalProps.onClose()
      },
    })
  }
  const handleUnblock = () => {
    if (!user || unblockLoading) return
    return handler(() => unblock({ variables: { userId: user.id } }), {
      onSuccess: () => {
        blockModalProps.onClose()
      },
    })
  }

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)
  const { onCopy } = useClipboard(`${WEB_URL}/${user?.handle}`)

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
  if (!user)
    return (
      <Center minH="80vh">
        <NoData>Profile not found</NoData>
      </Center>
    )
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
        <NextLink href="/home">
          <IconButton
            aria-label="back"
            icon={<Box as={BiArrowBack} boxSize="20px" />}
            variant="ghost"
            m={2}
          />
        </NextLink>
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
        <Stack px={4} pt="85px" pb={6} spacing={5}>
          <HStack align="flex-end" justify="space-between">
            <Avatar src={user.avatar || undefined} boxSize="70px" />
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
                <Menu placement="bottom">
                  <MenuButton
                    as={IconButton}
                    aria-label="more"
                    icon={<Box as={HiOutlineDotsHorizontal} boxSize="20px" />}
                    variant="outline"
                    minW="34px"
                    boxSize="34px"
                  />
                  <Portal>
                    <MenuList onClick={(e) => e.stopPropagation()}>
                      {!hasBlocked && (
                        <>
                          {/* COPY */}
                          <MenuItem
                            icon={<Box as={AiOutlineLink} boxSize="18px" />}
                            fontWeight="medium"
                            onClick={onCopy}
                          >
                            Copy link to profile
                          </MenuItem>
                          {/* MUTE */}
                          <MenuItem
                            icon={<Box as={hasMuted ? BiVolumeFull : BiVolumeMute} boxSize="18px" />}
                            fontWeight="medium"
                            onClick={hasMuted ? handleUnmute : handleMute}
                          >
                            {`${hasMuted ? "Unmute" : "Mute"} @${user.handle}`}
                          </MenuItem>
                        </>
                      )}
                      {/* BLOCK */}
                      <MenuItem
                        icon={<Box as={hasBlocked ? CgUnblock : BiBlock} boxSize="18px" />}
                        fontWeight="medium"
                        onClick={blockModalProps.onOpen}
                      >
                        {`${hasBlocked ? "Unblock" : "Block"} @${user.handle}`}
                      </MenuItem>
                      {/* REPORT */}
                      <NextLink href={`/${handle}/report`}>
                        <MenuItem icon={<Box as={BiFlag} boxSize="18px" />} fontWeight="medium">
                          Report @{user.handle}
                        </MenuItem>
                      </NextLink>
                    </MenuList>
                  </Portal>
                </Menu>

                {hasBlocked ? (
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
                      icon={<Box as={FiMail} boxSize="18px" />}
                      variant="outline"
                      boxSize="34px"
                      minW="34px"
                    />
                    <FollowButton userId={user.id} defaultShowFollowing />
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
            {!hasBlocked && (
              <>
                <Text fontSize="sm">{user.bio}</Text>
                <Flex flexWrap="wrap">
                  {user.location && (
                    <HStack spacing={1} align="baseline" mr={2}>
                      <Icon as={SlLocationPin} color="gray.400" boxSize="14px" />
                      <Text fontSize="sm" color="gray.400">
                        {user.location}
                      </Text>
                    </HStack>
                  )}
                  {user.website && (
                    <HStack spacing={1} align="center" mr={2}>
                      <Icon as={AiOutlineLink} color="gray.400" boxSize="18px" />
                      <Link isExternal href={websiteUrl}>
                        <Text fontSize="sm">{user.website}</Text>
                      </Link>
                    </HStack>
                  )}
                  {user.dob &&
                    (user.dobDayMonthPrivacy === DobPrivacy.Public ||
                      user.dobYearPrivacy === DobPrivacy.Public) && (
                      <HStack spacing={1} align="center" mr={2}>
                        <Icon as={BsBalloon} color="gray.400" boxSize="16px" />
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
                    <Icon as={BsCalendar3} color="gray.400" boxSize="12px" />
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
            {hasMuted && (
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
      {hasBlocked && !showBlockedPosts ? (
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
            <ProfileTab href={`/${user.handle}`}>Posts</ProfileTab>
            <ProfileTab href={`/${user.handle}/replies`}>Replies</ProfileTab>
            <ProfileTab href={`/${user.handle}/likes`}>Likes</ProfileTab>
          </Flex>
        </Box>
      )}

      {/* CONTENT */}
      {(showBlockedPosts || !hasBlocked) && <Box>{children}</Box>}

      {/* BLOCK/UNBLOCK MODAL */}
      <Modal {...blockModalProps} title={`${hasBlocked ? "Unblock" : "Block"} @${user.handle}?`}>
        <Text mb={6} fontSize="sm" color="gray.400">
          {hasBlocked
            ? "They will be able to follow you and view your posts."
            : `They will not be able to follow you or view your posts, and you will not see posts or notifications from @${user.handle}.`}
        </Text>
        <Stack>
          {hasBlocked ? (
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
      <Modal {...muteModalProps} title={`${hasMuted ? "Unmute" : "Mute"} @${user.handle}?`}>
        <Text mb={6}>
          {hasMuted
            ? "Posts from this account will now be allowed in your Home timeline."
            : `They will not be able to follow you or view your posts, and you will not see posts or notifications from @${user.handle}.`}
        </Text>
        <Stack>
          {hasMuted ? (
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
    </Box>
  )
}
