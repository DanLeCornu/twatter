import * as React from "react"
import { BrowserView, MobileView } from "react-device-detect"
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
import {
  Ban,
  BarChart3,
  Flag,
  MoreHorizontal,
  Pin,
  Trash,
  UserRoundCheck,
  UserRoundX,
  Volume2,
  VolumeX,
} from "lucide-react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import type { PostItemFragment } from "lib/graphql"
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
  post: PostItemFragment
}

export function PostMenu({ post }: Props) {
  const { me } = useMe()
  const router = useRouter()
  const menuProps = useDisclosure()
  const modalProps = useDisclosure()
  const drawerProps = useDisclosure()
  const blockModalProps = useDisclosure()
  const handler = useMutationHandler()
  const analyticsModalProps = useDisclosure()

  // const isPost = item.__typename === "Post"
  const hasFollowed = me?.following.map((following) => following.id).includes(post.user.id)
  const hasMuted = me?.mutedAccounts.map((mutedAccount) => mutedAccount.id).includes(post.user.id)
  const hasBlocked = me?.blockedAccounts.map((blockedAccount) => blockedAccount.id).includes(post.user.id)

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
          where: { user: { is: { handle: { equals: post.user.handle } } } },
        },
      },
    ],
  })
  // const [updateReply, { loading: updateReplyLoading }] = useUpdateReplyMutation({
  //   refetchQueries: [
  //     {
  //       query: GetPostDocument,
  //       variables: { where: { id: { equals: (post as ReplyItemFragment).postId } } },
  //     },
  //   ],
  // })
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
    return handler(() => follow({ variables: { userId: post.user.id } }), {
      onSuccess: (_, toast) => {
        drawerProps.onClose()
        toast({ description: `You followed @${post.user.handle}` })
      },
    })
  }
  const handleUnfollow = () => {
    if (unfollowLoading) return
    return handler(() => unfollow({ variables: { userId: post.user.id } }), {
      onSuccess: (_, toast) => {
        drawerProps.onClose()
        toast({ description: `You unfollowed @${post.user.handle}` })
      },
    })
  }
  const handleMute = () => {
    if (muteLoading) return
    return handler(() => mute({ variables: { userId: post.user.id } }), {
      onSuccess: (_, toast) => {
        toast({
          description: `@${post.user.handle} has been muted`,
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
    return handler(() => unmute({ variables: { userId: post.user.id } }), {
      onSuccess: (_, toast) => {
        toast({ description: `@${post.user.handle} has been unmuted` })
      },
    })
  }
  const handleBlock = () => {
    if (blockLoading) return
    return handler(() => block({ variables: { userId: post.user.id } }), {
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
        router.replace("/home")
      },
    })
  }
  const handleUnblock = () => {
    if (unblockLoading) return
    return handler(() => unblock({ variables: { userId: post.user.id } }), {
      onSuccess: () => {
        blockModalProps.onClose()
      },
    })
  }
  const handleDeleteItem = () => {
    // if (isPost) {
    if (updatePostLoading) return
    return handler(
      () => updatePost({ variables: { postId: post.id, data: { archivedAt: new Date().toString() } } }),
      {
        onSuccess: () => {
          modalProps.onClose()
        },
      },
    )
    // } else {
    //   if (updateReplyLoading) return
    //   return handler(
    //     () => updateReply({ variables: { replyId: item.id, data: { archivedAt: new Date().toString() } } }),
    //     {
    //       onSuccess: () => {
    //         modalProps.onClose()
    //       },
    //     },
    //   )
    // }
  }
  const handlePinPost = () => {
    if (pinPostLoading) return
    return handler(() => pinPost({ variables: { data: { pinnedPostId: post.id } } }))
  }
  const handleUnpinPost = () => {
    if (pinPostLoading) return
    return handler(() => pinPost({ variables: { data: { pinnedPostId: null } } }))
  }

  const drawerBg = useColorModeValue("white", "brand.bgDark")

  if (!me) return null

  return (
    <>
      <MobileView>
        <IconButton
          aria-label="open item menu"
          variant="ghost"
          boxSize="35px"
          minW="35px" // needed otherwise Chakra default styling overrides and makes it wider
          icon={<Box as={MoreHorizontal} boxSize="20px" color="gray.400" />}
          onClick={(e) => {
            e.preventDefault() // Stops Next link
            drawerProps.onOpen()
          }}
        />
        <Drawer {...drawerProps} placement="bottom" trapFocus={false}>
          <DrawerOverlay />
          <DrawerContent bg={drawerBg}>
            <DrawerBody p={4}>
              <Stack spacing={5}>
                {me?.id === post.user.id ? (
                  <>
                    {/* DELETE */}
                    <HStack
                      spacing={3}
                      onClick={() => {
                        drawerProps.onClose()
                        modalProps.onOpen()
                      }}
                    >
                      <Icon as={Trash} color="red.500" boxSize="18px" />
                      <Text fontWeight="bold" color="red.500">
                        Delete
                      </Text>
                    </HStack>
                    {/* PIN */}
                    {/* {isPost && ( */}
                    <HStack
                      spacing={3}
                      onClick={me.pinnedPost?.id === post.id ? handleUnpinPost : handlePinPost}
                    >
                      <Icon as={Pin} boxSize="18px" />
                      <Text fontWeight="bold">
                        {me.pinnedPost?.id === post.id ? "Unpin from profile" : "Pin to your profile"}
                      </Text>
                    </HStack>
                    {/* )} */}
                    {/* POST ANALYTICS */}
                    <HStack
                      spacing={3}
                      onClick={() => {
                        drawerProps.onClose()
                        analyticsModalProps.onOpen()
                      }}
                    >
                      <Icon as={BarChart3} boxSize="18px" />
                      <Text fontWeight="bold">View post engagements</Text>
                    </HStack>
                  </>
                ) : (
                  <>
                    {/* FOLLOW */}
                    <HStack spacing={3} onClick={hasFollowed ? handleUnfollow : handleFollow}>
                      <Icon as={hasFollowed ? UserRoundX : UserRoundCheck} boxSize="18px" />
                      <Text fontWeight="bold">
                        {`${hasFollowed ? "Unfollow" : "Follow"} @${post.user.handle}`}
                      </Text>
                    </HStack>
                    {/* MUTE */}
                    <HStack spacing={3} onClick={hasMuted ? handleUnmute : handleMute}>
                      <Icon as={hasMuted ? Volume2 : VolumeX} boxSize="18px" />
                      <Text fontWeight="bold">{`${hasMuted ? "Unmute" : "Mute"} @${post.user.handle}`}</Text>
                    </HStack>
                    {/* BLOCK */}
                    <HStack
                      spacing={3}
                      onClick={() => {
                        drawerProps.onClose()
                        blockModalProps.onOpen()
                      }}
                    >
                      <Icon as={Ban} boxSize="18px" />
                      <Text fontWeight="bold">
                        {hasBlocked ? "Unblock" : "Block"} @{post.user.handle}
                      </Text>
                    </HStack>
                    {/* REPORT */}
                    {/* <NextLink href={`/${isPost ? "posts" : "replies"}/${item.id}/report`}> */}
                    <NextLink href={`/posts/${post.id}/report`}>
                      <HStack spacing={3}>
                        <Icon as={Flag} boxSize="18px" />
                        <Text fontWeight="bold">Report post</Text>
                      </HStack>
                    </NextLink>
                  </>
                )}

                <Button variant="outline" colorScheme="monochrome" onClick={drawerProps.onClose}>
                  Cancel
                </Button>
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
            icon={<Box as={MoreHorizontal} boxSize="20px" color="gray.400" />}
            onClick={(e) => {
              e.preventDefault() // Stops Next link
              menuProps.onToggle()
            }}
          />
          <Portal>
            <MenuList onClick={(e) => e.stopPropagation()}>
              {me?.id === post.user.id ? (
                <>
                  {/* DELETE */}
                  <MenuItem
                    color="red"
                    icon={<Box as={Trash} boxSize="18px" />}
                    fontWeight="medium"
                    onClick={modalProps.onOpen}
                  >
                    Delete
                  </MenuItem>
                  {/* PIN */}
                  {/* {isPost && ( */}
                  {/* // TODO ability to pin a reply */}
                  <MenuItem
                    icon={<Box as={Pin} boxSize="18px" />}
                    fontWeight="medium"
                    onClick={me.pinnedPost?.id === post.id ? handleUnpinPost : handlePinPost}
                  >
                    {me.pinnedPost?.id === post.id ? "Unpin from profile" : "Pin to your profile"}
                  </MenuItem>
                  {/* )} */}
                  {/* POST ANALYTICS */}
                  <MenuItem
                    icon={<Box as={BarChart3} boxSize="18px" />}
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
                    icon={<Box as={hasFollowed ? UserRoundX : UserRoundCheck} boxSize="18px" />}
                    fontWeight="medium"
                    onClick={hasFollowed ? handleUnfollow : handleFollow}
                  >
                    {`${hasFollowed ? "Unfollow" : "Follow"} @${post.user.handle}`}
                  </MenuItem>
                  {/* MUTE */}
                  <MenuItem
                    icon={<Box as={hasMuted ? Volume2 : VolumeX} boxSize="18px" />}
                    fontWeight="medium"
                    onClick={hasMuted ? handleUnmute : handleMute}
                  >
                    {`${hasMuted ? "Unmute" : "Mute"} @${post.user.handle}`}
                  </MenuItem>
                  {/* BLOCK */}
                  <MenuItem
                    icon={<Box as={Ban} boxSize="18px" />}
                    fontWeight="medium"
                    onClick={blockModalProps.onOpen}
                  >
                    {hasBlocked ? "Unblock" : "Block"} @{post.user.handle}
                  </MenuItem>
                  {/* REPORT */}
                  <NextLink href={`/posts/${post.id}/report`}>
                    <MenuItem icon={<Box as={Flag} boxSize="18px" />} fontWeight="medium">
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
      <Modal {...blockModalProps} title={`${hasBlocked ? "Unblock" : "Block"} @${post.user.handle}?`}>
        <Text mb={6} fontSize="sm" color="gray.400">
          {hasBlocked
            ? "They will be able to follow you and view your posts."
            : `They will not be able to follow you or view your posts, and you will not see posts or notifications from @${post.user.handle}.`}
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
        title={post.user.id === me?.id ? "Post Analytics" : "Views"}
        size="full"
        closeButton
      >
        <PostAnalytics post={post} />
      </Modal>
    </>
  )
}
