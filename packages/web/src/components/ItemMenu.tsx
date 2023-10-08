import * as React from "react"
import { BiBlock, BiFlag, BiTrash, BiVolumeFull, BiVolumeMute } from "react-icons/bi"
import { BsPin } from "react-icons/bs"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { IoIosStats } from "react-icons/io"
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri"
import { gql } from "@apollo/client"
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import type { PostItemFragment, ReplyItemFragment} from "lib/graphql";
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
  const blockModalProps = useDisclosure()
  const handler = useMutationHandler()

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
    refetchQueries: [
      { query: MeDocument },
      { query: GetPostsDocument, variables: { orderBy: { createdAt: SortOrder.Desc } } },
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
      onSuccess: () => {
        router.replace("/home")
      },
    })
  }
  const handleUnmute = () => {
    if (unmuteLoading) return
    return handler(() => unmute({ variables: { userId: item.user.id } }))
  }
  const handleBlock = () => {
    if (blockLoading) return
    return handler(() => block({ variables: { userId: item.user.id } }), {
      onSuccess: () => {
        router.replace(`/${item.user.handle}`)
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

  return (
    <>
      <Menu placement="bottom" {...menuProps}>
        <MenuButton
          as={IconButton}
          variant="ghost"
          boxSize="35px"
          minW="35px" // needed otherwise Chakra default styling overrides and makes it wider
          icon={<Box as={HiOutlineDotsHorizontal} boxSize="20px" />}
          onClick={(e) => {
            e.preventDefault() // Stops Next link
            menuProps.onToggle()
          }}
          // _hover={{ color: "blue.500" }}
        />
        <Portal>
          <MenuList onClick={(e) => e.stopPropagation()}>
            {me?.id === item.user.id ? (
              <>
                <MenuItem
                  color="red"
                  icon={<Box as={BiTrash} boxSize="18px" />}
                  fontWeight="medium"
                  onClick={modalProps.onOpen}
                >
                  Delete
                </MenuItem>
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
                <MenuItem
                  icon={<Box as={IoIosStats} boxSize="18px" />}
                  fontWeight="medium"
                  // onClick={(e) => {
                  //   modalProps.onOpen()
                  // }}
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
    </>
  )
}
