import * as React from "react"
import { AiOutlineLink } from "react-icons/ai"
import { BsPinFill } from "react-icons/bs"
import { FaRegComment } from "react-icons/fa"
import { FiBookmark, FiMail, FiShare } from "react-icons/fi"
import { IoIosStats } from "react-icons/io"
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
  useClipboard,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import NextLink from "next/link"

import { WEB_URL } from "lib/config"
import type { PostItemFragment } from "lib/graphql"
import { getHighlightedText } from "lib/hooks/useHighlightText"
import { useMe } from "lib/hooks/useMe"
import { useToast } from "lib/hooks/useToast"

import { BookmarkPost } from "./BookmarkPost"
import { ItemHeading } from "./ItemHeading"
import { ItemMenu } from "./ItemMenu"
import { LikePost } from "./LikePost"
import { Modal } from "./Modal"
import { PostAnalytics } from "./PostAnalytics"
import { UserPopover } from "./UserPopover"

interface Props {
  post: PostItemFragment
  isPinned?: boolean
}

export function PostItem({ post, isPinned = false }: Props) {
  const { me } = useMe()
  const toast = useToast()
  const menuProps = useDisclosure()
  const modalProps = useDisclosure()
  const borderColor = useColorModeValue("gray.100", "gray.700")
  const bgHover = useColorModeValue("gray.50", "#182234")
  const popoverBg = useColorModeValue("white", "#1A202C")
  const { onCopy } = useClipboard(`${WEB_URL}/posts/${post.id}`)

  return (
    <NextLink href={`/posts/${post.id}`}>
      <Box
        key={post.id}
        borderBottom="1px solid"
        borderColor={borderColor}
        _hover={{ bg: bgHover }}
        pt={isPinned ? 1 : 3}
        pb={1}
        pl={4}
        pr={1}
      >
        {isPinned && (
          <HStack pl="26px" my={1}>
            <Icon as={BsPinFill} color="gray.400" boxSize="14px" />
            <Text color="gray.400" fontWeight="medium" fontSize="13px">
              Pinned
            </Text>
          </HStack>
        )}

        <Flex align="flex-start">
          <Popover isLazy trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              {/* AVATAR */}
              <NextLink href={`/${post.user.handle}`}>
                <Avatar src={post.user.avatar || undefined} boxSize="40px" />
              </NextLink>
            </PopoverTrigger>
            <PopoverContent bg={popoverBg}>
              <PopoverBody>
                <UserPopover user={post.user} />
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Stack spacing={0} w="calc(100% - 40px)">
            <HStack pl={2} justify="space-between" spacing={0} h="24px">
              <Box w="calc(100% - 35px)">
                {/* NAME & HANDLE */}
                <ItemHeading item={post} />
              </Box>
              {/* MENU */}
              <ItemMenu item={post} />
            </HStack>
            {/* CONTENT */}
            <Text pl={2} pb={3} pr={2} fontSize="sm">
              {getHighlightedText(post.text)}
            </Text>
            {post.image && (
              <Box pl={2} pr={2} pb={2}>
                <Image
                  alt="post image"
                  src={post.image}
                  rounded="2xl"
                  border="1px solid"
                  borderColor="gray.700"
                  maxH="500px"
                />
              </Box>
            )}
            <Box
              onClick={(e) => {
                e.preventDefault()
              }} // Stops Next link
            >
              <HStack justify="space-between" pr={8}>
                {/* REPLIES */}
                <NextLink href={`/replies/new?postId=${post.id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    color="gray"
                    _hover={{ color: "primary.500" }}
                    leftIcon={<Box as={FaRegComment} boxSize="16px" />}
                  >
                    {post.replyCount > 0 && post.replyCount.toLocaleString()}
                  </Button>
                </NextLink>
                {/* LIKES */}
                <LikePost size="small" postId={post.id} likeCount={post.likeCount} />
                {/* VIEWS */}
                <Button
                  variant="ghost"
                  size="sm"
                  color="gray"
                  _hover={{ color: "primary.500" }}
                  leftIcon={<Box as={IoIosStats} boxSize="16px" />}
                  onClick={modalProps.onOpen}
                >
                  {post.viewCount.toLocaleString()}
                </Button>

                {/* SHARE */}
                <Menu placement="bottom" {...menuProps}>
                  <MenuButton
                    as={IconButton}
                    variant="ghost"
                    color="gray"
                    size="sm"
                    _hover={{ color: "primary.500" }}
                    icon={<Box as={FiShare} boxSize="16px" />}
                  />
                  <Portal>
                    <MenuList onClick={(e) => e.stopPropagation()}>
                      <MenuItem
                        icon={<Box as={AiOutlineLink} boxSize="18px" />}
                        fontWeight="medium"
                        onClick={() => {
                          onCopy()
                          toast({ description: "Copied to clipboard" })
                        }}
                      >
                        Copy link
                      </MenuItem>
                      <MenuItem
                        icon={<Box as={FiMail} boxSize="18px" />}
                        fontWeight="medium"
                        // onClick={(e) => {
                        //   modalProps.onOpen()
                        // }}
                      >
                        Send via Direct Message
                      </MenuItem>
                      <BookmarkPost postId={post.id}>
                        {(hasBookmarked) => (
                          <MenuItem icon={<Box as={FiBookmark} boxSize="18px" />} fontWeight="medium">
                            {hasBookmarked ? "Remove from Bookmarks" : "Bookmark"}
                          </MenuItem>
                        )}
                      </BookmarkPost>
                    </MenuList>
                  </Portal>
                </Menu>

                <Modal
                  {...modalProps}
                  title={post.user.id === me?.id ? "Post Analytics" : "Views"}
                  size="full"
                  closeButton
                >
                  <PostAnalytics item={post} />
                </Modal>
              </HStack>
            </Box>
          </Stack>
        </Flex>
      </Box>
    </NextLink>
  )
}
