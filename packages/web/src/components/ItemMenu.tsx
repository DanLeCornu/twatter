import * as React from "react"
import { BrowserView, MobileView } from "react-device-detect"
import { BiBlock, BiFlag, BiTrash, BiVolumeFull, BiVolumeMute } from "react-icons/bi"
import { BsPin } from "react-icons/bs"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { IoIosStats } from "react-icons/io"
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri"
import { gql } from "@apollo/client"
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import type { PostItemFragment, ReplyItemFragment } from "lib/graphql"
import { GetPostDocument, useUpdateReplyMutation } from "lib/graphql"
import { useUnblockUserMutation } from "lib/graphql"
import {
  GetPostsDocument,
  MeDocument,
  SortOrder,
  useBlockUserMutation,
  useFollowUserMutation,
  useMuteUserMutation,
  usePinPostMutation,
  useUnfollowUserMutation,
  useUnmuteUserMutation,
  useUpdatePostMutation,
} from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"

import { Modal } from "./Modal"
import { PostAnalytics } from "./PostAnalytics"

export const _ = gql`
  mutation MuteUser($userId: String!) {
    muteUser(userId: $userId)
  }
  mutation BlockUser($userId: String!) {
    blockUser(userId: $userId)
  }
  mutation UpdatePost($postId: String!, $data: PostUpdateInput!) {
    updatePost(postId: $postId, data: $data) {
      ...PostItem
    }
  }
  mutation PinPost($data: UpdateUserInput!) {
    updateMe(data: $data) {
      id
      pinnedPostId
    }
  }
`

interface Props {
  item: PostItemFragment | ReplyItemFragment
}

export function ItemMenu({ item }: Props) {
  const { me } = useMe()
  const router = useRouter()
  const menuProps = useDisclosure()
  const modalProps = useDisclosure()
  const drawerProps = useDisclosure()
  const blockModalProps = useDisclosure()
  const handler = useMutationHandler()
  const analyticsModalProps = useDisclosure()

  const isPost = item.__typename === "Post"
  const hasFollowed = me?.following.map((following) => following.id).includes(item.user.id)
  const hasMuted = me?.mutedAccounts.map((mutedAccount) => mutedAccount.id).includes(item.user.id)
  const hasBlocked = me?.blockedAccounts.map((blockedAccount) => blockedAccount.id).includes(item.user.id)

  const [follow, { loading: followLoading }] = useFollowUserMutation({
    refetchQueries: [{ query: MeDocument }],
  })
  const [unfollow, { loading: unfollowLoading }] = useUnfollowUserMutation({
    refetchQueries: [{ query: MeDocument }],
  })
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
    refetchQueries: [
      { query: MeDocument },
      {
        query: GetPostsDocument,
        variables: { orderBy: { createdAt: SortOrder.Desc }, where: { userId: { not: { equals: me?.id } } } },
      },
    ],
  })
  const [updatePost, { loading: updatePostLoading }] = useUpdatePostMutation({
    refetchQueries: [
      { query: MeDocument },
      {
        query: GetPostsDocument,
        variables: {
          orderBy: { createdAt: SortOrder.Desc },
          where: { user: { is: { handle: { equals: item.user.handle } } } },
        },
      },
    ],
  })
  const [updateReply, { loading: updateReplyLoading }] = useUpdateReplyMutation({
    refetchQueries: [
      {
        query: GetPostDocument,
        variables: { where: { id: { equals: (item as ReplyItemFragment).postId } } },
      },
    ],
  })
  const [pinPost, { loading: pinPostLoading }] = usePinPostMutation({
    refetchQueries: [
      { query: MeDocument },
      {
        query: GetPostsDocument,
        variables: {
          orderBy: { createdAt: SortOrder.Desc },
          where: { user: { is: { handle: { equals: me?.handle || "" } } }, pinnedUser: null },
        },
      },
    ],
  })

  const handleFollow = () => {
    if (followLoading) return
    return handler(() => follow({ variables: { userId: item.user.id } }))
  }
  const handleUnfollow = () => {
    if (unfollowLoading) return
    return handler(() => unfollow({ variables: { userId: item.user.id } }))
  }
  const handleMute = () => {
    if (muteLoading) return
    return handler(() => mute({ variables: { userId: item.user.id } }), {
      onSuccess: (_, toast) => {
        toast({
          description: `@${item.user.handle} has been muted`,
          action: (
            <Link fontWeight="medium" color="white" fontSize="sm" onClick={handleUnmute}>
              Undo
            </Link>
          ),
        })
        router.replace("/home")
      },
    })
  }
  const handleUnmute = () => {
    if (unmuteLoading) return
    return handler(() => unmute({ variables: { userId: item.user.id } }), {
      onSuccess: (_, toast) => {
        toast({ description: `@${item.user.handle} has been unmuted` })
      },
    })
  }
  const handleBlock = () => {
    if (blockLoading) return
    return handler(() => block({ variables: { userId: item.user.id } }), {
      onSuccess: (_, toast) => {
        toast({
          description: "Successfully blocked",
          action: (
            <Link fontWeight="medium" color="white" fontSize="sm" onClick={handleUnblock}>
              Unblock
            </Link>
          ),
        })
        blockModalProps.onClose()
        // router.replace(`/${item.user.handle}`) // I don't think we want to redirect to the profile?
      },
    })
  }
  const handleUnblock = () => {
    if (unblockLoading) return
    return handler(() => unblock({ variables: { userId: item.user.id } }), {
      onSuccess: () => {
        blockModalProps.onClose()
      },
    })
  }
  const handleDeleteItem = () => {
    if (isPost) {
      if (updatePostLoading) return
      return handler(
        () => updatePost({ variables: { postId: item.id, data: { archivedAt: new Date().toString() } } }),
        {
          onSuccess: () => {
            modalProps.onClose()
          },
        },
      )
    } else {
      if (updateReplyLoading) return
      return handler(
        () => updateReply({ variables: { replyId: item.id, data: { archivedAt: new Date().toString() } } }),
        {
          onSuccess: () => {
            modalProps.onClose()
          },
        },
      )
    }
  }
  const handlePinPost = () => {
    if (pinPostLoading) return
    return handler(() => pinPost({ variables: { data: { pinnedPostId: item.id } } }))
  }
  const handleUnpinPost = () => {
    if (pinPostLoading) return
    return handler(() => pinPost({ variables: { data: { pinnedPostId: null } } }))
  }

  const drawerBg = useColorModeValue("white", "brand.bgDark")

  return (
    <>
      <MobileView>
        <IconButton
          aria-label="open drawer"
          variant="ghost"
          boxSize="35px"
          minW="35px" // needed otherwise Chakra default styling overrides and makes it wider
          icon={<Box as={HiOutlineDotsHorizontal} boxSize="20px" color="gray.400" />}
          onClick={(e) => {
            e.preventDefault() // Stops Next link
            drawerProps.onToggle()
          }}
        />
        <Drawer {...drawerProps} placement="bottom" trapFocus={false}>
          <DrawerOverlay />
          <DrawerContent bg={drawerBg}>
            <DrawerBody p={4}>
              <Stack spacing={5}>
                {me?.id === item.user.id ? (
                  <>
                    {/* DELETE */}
                    <HStack
                      spacing={3}
                      onClick={() => {
                        drawerProps.onClose()
                        modalProps.onOpen()
                      }}
                    >
                      <Icon as={BiTrash} color="red.500" boxSize="18px" />
                      <Text fontWeight="bold" color="red.500">
                        Delete
                      </Text>
                    </HStack>
                    {/* PIN */}
                    {isPost && (
                      <HStack
                        spacing={3}
                        onClick={me.pinnedPost?.id === item.id ? handleUnpinPost : handlePinPost}
                      >
                        <Icon as={BsPin} boxSize="18px" />
                        <Text fontWeight="bold">
                          {me.pinnedPost?.id === item.id ? "Unpin from profile" : "Pin to your profile"}
                        </Text>
                      </HStack>
                    )}
                    {/* POST ANALYTICS */}
                    <HStack
                      spacing={3}
                      onClick={() => {
                        drawerProps.onClose()
                        analyticsModalProps.onOpen()
                      }}
                    >
                      <Icon as={IoIosStats} boxSize="18px" />
                      <Text fontWeight="bold">View post engagements</Text>
                    </HStack>
                  </>
                ) : (
                  <>
                    {/* FOLLOW */}
                    <HStack spacing={3} onClick={hasFollowed ? handleUnfollow : handleFollow}>
                      <Icon as={hasFollowed ? RiUserUnfollowLine : RiUserFollowLine} boxSize="18px" />
                      <Text fontWeight="bold">
                        {`${hasFollowed ? "Unfollow" : "Follow"} @${item.user.handle}`}
                      </Text>
                    </HStack>
                    {/* MUTE */}
                    <HStack spacing={3} onClick={hasMuted ? handleUnmute : handleMute}>
                      <Icon as={hasMuted ? BiVolumeFull : BiVolumeMute} boxSize="18px" />
                      <Text fontWeight="bold">{`${hasMuted ? "Unmute" : "Mute"} @${item.user.handle}`}</Text>
                    </HStack>
                    {/* BLOCK */}
                    <HStack
                      spacing={3}
                      onClick={() => {
                        drawerProps.onClose()
                        blockModalProps.onOpen()
                      }}
                    >
                      <Icon as={BiBlock} boxSize="18px" />
                      <Text fontWeight="bold">
                        {hasBlocked ? "Unblock" : "Block"} @{item.user.handle}
                      </Text>
                    </HStack>
                    {/* REPORT */}
                    <NextLink href={`/${isPost ? "posts" : "replies"}/${item.id}/report`}>
                      <HStack spacing={3}>
                        <Icon as={BiFlag} boxSize="18px" />
                        <Text fontWeight="bold">Report post</Text>
                      </HStack>
                    </NextLink>
                  </>
                )}
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </MobileView>
      <BrowserView>
        <Menu placement="bottom" {...menuProps}>
          <MenuButton
            as={IconButton}
            variant="ghost"
            boxSize="35px"
            minW="35px" // needed otherwise Chakra default styling overrides and makes it wider
            icon={<Box as={HiOutlineDotsHorizontal} boxSize="20px" color="gray.400" />}
            onClick={(e) => {
              e.preventDefault() // Stops Next link
              menuProps.onToggle()
            }}
          />
          <Portal>
            <MenuList onClick={(e) => e.stopPropagation()}>
              {me?.id === item.user.id ? (
                <>
                  {/* DELETE */}
                  <MenuItem
                    color="red"
                    icon={<Box as={BiTrash} boxSize="18px" />}
                    fontWeight="medium"
                    onClick={modalProps.onOpen}
                  >
                    Delete
                  </MenuItem>
                  {/* PIN */}
                  {isPost && (
                    // TODO ability to pin a reply
                    <MenuItem
                      icon={<Box as={BsPin} boxSize="18px" />}
                      fontWeight="medium"
                      onClick={me.pinnedPost?.id === item.id ? handleUnpinPost : handlePinPost}
                    >
                      {me.pinnedPost?.id === item.id ? "Unpin from profile" : "Pin to your profile"}
                    </MenuItem>
                  )}
                  {/* POST ANALYTICS */}
                  <MenuItem
                    icon={<Box as={IoIosStats} boxSize="18px" />}
                    fontWeight="medium"
                    onClick={analyticsModalProps.onOpen}
                  >
                    View post engagements
                  </MenuItem>
                </>
              ) : (
                <>
                  {/* FOLLOW */}
                  <MenuItem
                    closeOnSelect
                    icon={<Box as={hasFollowed ? RiUserUnfollowLine : RiUserFollowLine} boxSize="18px" />}
                    fontWeight="medium"
                    onClick={hasFollowed ? handleUnfollow : handleFollow}
                  >
                    {`${hasFollowed ? "Unfollow" : "Follow"} @${item.user.handle}`}
                  </MenuItem>
                  {/* MUTE */}
                  <MenuItem
                    icon={<Box as={hasMuted ? BiVolumeFull : BiVolumeMute} boxSize="18px" />}
                    fontWeight="medium"
                    onClick={hasMuted ? handleUnmute : handleMute}
                  >
                    {`${hasMuted ? "Unmute" : "Mute"} @${item.user.handle}`}
                  </MenuItem>
                  {/* BLOCK */}
                  <MenuItem
                    icon={<Box as={BiBlock} boxSize="18px" />}
                    fontWeight="medium"
                    onClick={blockModalProps.onOpen}
                  >
                    {hasBlocked ? "Unblock" : "Block"} @{item.user.handle}
                  </MenuItem>
                  {/* REPORT */}
                  <NextLink href={`/${isPost ? "posts" : "replies"}/${item.id}/report`}>
                    <MenuItem icon={<Box as={BiFlag} boxSize="18px" />} fontWeight="medium">
                      Report post
                    </MenuItem>
                  </NextLink>
                </>
              )}
            </MenuList>
          </Portal>
        </Menu>
      </BrowserView>

      {/* BLOCK/UNBLOCK MODAL */}
      <Modal {...blockModalProps} title={`${hasBlocked ? "Unblock" : "Block"} @${item.user.handle}?`}>
        <Text mb={6} fontSize="sm" color="gray.400">
          {hasBlocked
            ? "They will be able to follow you and view your posts."
            : `They will not be able to follow you or view your posts, and you will not see posts or notifications from @${item.user.handle}.`}
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

      {/* DELETE POST MODAL */}
      <Modal {...modalProps} title="Delete post?">
        <Text mb={6}>
          This can't be undone and it will be removed from your profile, the timeline of any accounts that
          follow you, and from search results.
        </Text>
        <Stack>
          <Button bg="red" onClick={handleDeleteItem} _hover={{ bg: "red" }}>
            Delete
          </Button>
          <Button colorScheme="monochrome" variant="outline" onClick={modalProps.onClose}>
            Cancel
          </Button>
        </Stack>
      </Modal>

      {/* POST ANALYTICS MODAL */}
      <Modal
        {...analyticsModalProps}
        title={item.user.id === me?.id ? "Post Analytics" : "Views"}
        size="full"
        closeButton
      >
        <PostAnalytics item={item} />
      </Modal>
    </>
  )
}
