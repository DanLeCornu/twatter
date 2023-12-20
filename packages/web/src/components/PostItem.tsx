import * as React from "react"
import { BrowserView, MobileView } from "react-device-detect"
import { BsPinFill } from "react-icons/bs"
import { FaRegComment } from "react-icons/fa"
import { IoIosStats } from "react-icons/io"
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import NextLink from "next/link"

import type { PostItemFragment } from "lib/graphql"
import { useHighlightedText } from "lib/hooks/useHighlightText"
import { useMe } from "lib/hooks/useMe"

import { ItemHeading } from "./ItemHeading"
import { ItemMenu } from "./ItemMenu"
import { LikePost } from "./LikePost"
import { Modal } from "./Modal"
import { PostAnalytics } from "./PostAnalytics"
import { PostItemShareMenu } from "./PostItemShareMenu"
import { UserPopover } from "./UserPopover"
import { stringsOnly } from "lib/helpers/utils"

interface Props {
  post: PostItemFragment
  isPinned?: boolean
}

export function PostItem({ post, isPinned = false }: Props) {
  const { me } = useMe()
  const modalProps = useDisclosure()

  const borderColor = useColorModeValue("gray.100", "gray.700")
  const bgHover = useColorModeValue("gray.50", "#182234")
  const popoverBg = useColorModeValue("white", "#1A202C")

  const mentions = stringsOnly(post.mentions.map((mention) => "@" + mention.user.handle))

  return (
    <>
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
            {/* AVATAR */}
            <MobileView>
              <NextLink href={`/${post.user.handle}`}>
                <Avatar src={post.user.avatar || undefined} boxSize="40px" />
              </NextLink>
            </MobileView>
            <BrowserView>
              <Popover isLazy trigger="hover" placement="bottom-start">
                <PopoverTrigger>
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
            </BrowserView>
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
                {useHighlightedText(post.text, mentions)}
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
                  <PostItemShareMenu postId={post.id} />
                </HStack>
              </Box>
            </Stack>
          </Flex>
        </Box>
      </NextLink>

      {/* POST ANALYTICS MODAL */}
      <Modal
        {...modalProps}
        title={post.user.id === me?.id ? "Post Analytics" : "Views"}
        size="full"
        closeButton
      >
        <PostAnalytics item={post} />
      </Modal>
    </>
  )
}
