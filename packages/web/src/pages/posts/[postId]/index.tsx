import * as React from "react"
import { BrowserView } from "react-device-detect"
import { BiArrowBack, BiImage } from "react-icons/bi"
import { BsPinFill } from "react-icons/bs"
import { CgClose } from "react-icons/cg"
import { FaRegComment } from "react-icons/fa"
import { FiBookmark } from "react-icons/fi"
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
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import dayjs from "dayjs"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { ReplySchema } from "pages/replies/new"

import type { PostDetailFragment } from "lib/graphql"
import { useUpdateReplyMutation } from "lib/graphql"
import { MeDocument, useUnblockUserMutation } from "lib/graphql"
import { GetPostDocument, useCreateReplyMutation, useGetPostQuery } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"
import { useS3Upload } from "lib/hooks/useS3"
import { useViewPost } from "lib/hooks/useViewPost"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { UPLOAD_PATHS } from "lib/uploadPaths"
import type yup from "lib/yup"
import type { AttachedImage } from "components/AttachImage"
import { AttachImage } from "components/AttachImage"
import { BookmarkPost } from "components/BookmarkPost"
import { FollowButton } from "components/FollowButton"
import { Form } from "components/Form"
import { withAuth } from "components/hoc/withAuth"
import { HomeLayout } from "components/HomeLayout"
import { ItemMenu } from "components/ItemMenu"
import { LikePost } from "components/LikePost"
import { Modal } from "components/Modal"
import { NoData } from "components/NoData"
import { PostDetailShareMenu } from "components/PostDetailShareMenu"
import { ReplyItem } from "components/ReplyItem"
import { Textarea } from "components/Textarea"
import { UserPopover } from "components/UserPopover"

export const _ = gql`
  fragment ReplyItem on Reply {
    id
    postId
    text
    image
    createdAt
    user {
      ...UserDetail
    }
  }
  fragment PostDetail on Post {
    id
    text
    createdAt
    replyCount
    likeCount
    bookmarkCount
    viewCount
    user {
      ...UserDetail
    }
    replies {
      ...ReplyItem
    }
  }
  query GetPost($where: PostWhereInput!) {
    post(where: $where) {
      ...PostDetail
    }
  }
`

function Post() {
  const { me } = useMe()
  const router = useRouter()
  const handler = useMutationHandler()
  const modalProps = useDisclosure()

  const handleColor = useColorModeValue("gray.400", "gray.500")
  const borderColor = useColorModeValue("gray.100", "gray.700")
  const viewCountColor = useColorModeValue("gray.400", "white")
  const postId = router.query.postId as string

  useViewPost(postId)

  const { data, loading } = useGetPostQuery({
    fetchPolicy: "cache-and-network",
    variables: { where: { id: { equals: postId } } },
    skip: !!!postId,
  })
  const post = data?.post
  const replies = post?.replies || []

  const [unblock, { loading: unblockLoading }] = useUnblockUserMutation({
    refetchQueries: [{ query: MeDocument }],
  })

  const hasBlocked =
    post && me?.blockedAccounts.map((blockedAccount) => blockedAccount.id).includes(post.user.id)

  const popoverBg = useColorModeValue("white", "#1A202C")
  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)

  const handleUnblock = () => {
    if (!post || unblockLoading) return
    return handler(() => unblock({ variables: { userId: post.user.id } }), {
      onSuccess: () => {
        modalProps.onClose()
      },
    })
  }

  if (loading && !post)
    return (
      <Center minH="80vh">
        <Spinner />
      </Center>
    )
  if (!post)
    return (
      <Center minH="80vh">
        <Stack align="center">
          <NoData>Post not found</NoData>
          <Box fontSize="sm" textAlign="center" px={7}>
            <Stack>
              <Text>
                This post may be deleted, or from a blocked or muted account - you can update this in your
                settings
              </Text>
              <NextLink href="/home">
                <Text textDecor="underline">Back to Twatter</Text>
              </NextLink>
            </Stack>
          </Box>
        </Stack>
      </Center>
    )
  return (
    <Box>
      <Stack borderBottom="1px solid" borderColor={borderColor}>
        <Flex
          w="100%"
          maxW="100vw"
          h="56px"
          position="fixed"
          backdropFilter="blur(10px)"
          bgColor={bgColor}
          zIndex={1}
          align="center"
        >
          <IconButton
            aria-label="back"
            icon={<Box as={BiArrowBack} boxSize="20px" />}
            variant="ghost"
            m={2}
            onClick={() => router.back()}
          />
          <Heading as="h1" size="md">
            Post
          </Heading>
        </Flex>

        <Box pt="56px">
          {post.user.pinnedPostId === post.id && (
            <HStack pl="46px" my={1}>
              <Icon as={BsPinFill} color="gray.400" boxSize="14px" />
              <Text color="gray.400" fontWeight="medium" fontSize="13px">
                Pinned
              </Text>
            </HStack>
          )}
          <HStack px={4} justify="space-between">
            <HStack spacing={3}>
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

              <Popover isLazy trigger="hover" placement="bottom-start">
                <PopoverTrigger>
                  <NextLink href={`/${post.user.handle}`}>
                    <Stack spacing={0}>
                      <Text fontWeight="bold" _hover={{ textDecoration: "underline" }} noOfLines={1}>
                        {post.user.name}
                      </Text>
                      <Text fontSize="sm" fontWeight="medium" color={handleColor}>
                        @{post.user.handle}
                      </Text>
                    </Stack>
                  </NextLink>
                </PopoverTrigger>
                <PopoverContent bg={popoverBg}>
                  <PopoverBody>
                    <UserPopover user={post.user} />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </HStack>
            <HStack spacing={0}>
              {hasBlocked ? (
                <>
                  {/* BLOCK BUTTON */}
                  <Button
                    bg="red"
                    size="sm"
                    onClick={modalProps.onOpen}
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
                  {/* BLOCK MODAL */}
                  <Modal {...modalProps} title={`Unblock @${post.user.handle}?`}>
                    <Text mb={6} fontSize="sm" color="gray.400">
                      They will be able to follow you and view your posts.
                    </Text>
                    <Stack>
                      <Button colorScheme="monochrome" onClick={handleUnblock}>
                        Unblock
                      </Button>
                      <Button colorScheme="monochrome" variant="outline" onClick={modalProps.onClose}>
                        Cancel
                      </Button>
                    </Stack>
                  </Modal>
                </>
              ) : (
                post.user.id !== me?.id && (
                  <>
                    {/* FOLLOW */}
                    <FollowButton userId={post.user.id} handle={post.user.handle} />
                  </>
                )
              )}
              {/* MENU */}
              <ItemMenu item={post} />
            </HStack>
          </HStack>
        </Box>
        <Text px={4} fontSize="lg">
          {post.text}
        </Text>
        <HStack px={4} color={handleColor} spacing={1}>
          <Text fontSize="sm">{dayjs(post.createdAt).format("h:mm A")}</Text>
          <Box>&#183;</Box>
          <Text fontSize="sm">{dayjs(post.createdAt).format("MMM DD, YYYY")}</Text>
          <Box>&#183;</Box>
          <Text fontSize="sm" fontWeight="bold" color={viewCountColor}>
            {post.viewCount.toLocaleString()}
          </Text>
          <Text fontSize="sm">Views</Text>
        </HStack>
        <Box px={4}>
          <Divider />
        </Box>
        <HStack spacing={0} pl={2} pr={4} justify="space-around">
          {/* REPLY */}
          <NextLink href={`/replies/new?postId=${post.id}`}>
            <Button
              variant="ghost"
              color="gray"
              _hover={{ color: "primary.500" }}
              leftIcon={<Box as={FaRegComment} boxSize="22px" />}
            >
              {post.replyCount > 0 && post.replyCount.toLocaleString()}
            </Button>
          </NextLink>
          {/* LIKE */}
          <LikePost postId={post.id} likeCount={post.likeCount} />
          {/* BOOKMARK */}
          <BookmarkPost postId={post.id}>
            {(hasBookmarked: boolean) => (
              <Button
                variant="ghost"
                color={hasBookmarked ? "primary.500" : "gray"}
                _hover={{ color: "primary.500" }}
                leftIcon={<Box as={FiBookmark} boxSize="25px" />}
              >
                {post.bookmarkCount > 0 && post.bookmarkCount.toLocaleString()}
              </Button>
            )}
          </BookmarkPost>

          {/* SHARE */}
          <PostDetailShareMenu postId={postId} />
        </HStack>
        <Box px={4}>
          <Divider />
        </Box>
        <BrowserView>
          <ReplyForm post={post} />
        </BrowserView>
      </Stack>
      {/* REPLIES */}
      {replies.length > 0 ? replies.map((reply) => <ReplyItem key={reply.id} reply={reply} />) : null}
    </Box>
  )
}

Post.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>

export default withAuth(Post)

interface ReplyFormProps {
  post: PostDetailFragment
}

function ReplyForm({ post }: ReplyFormProps) {
  const { me } = useMe()
  const [isActive, setIsActive] = React.useState(false)
  const [submitDisabled, setSubmitDisabled] = React.useState(true)
  const [image, setImage] = React.useState<AttachedImage | null>(null)

  const [create, { loading }] = useCreateReplyMutation({
    refetchQueries: [{ query: GetPostDocument, variables: { where: { id: { equals: post.id } } } }],
  })
  const [upload] = useS3Upload()
  const [update] = useUpdateReplyMutation()

  const form = useForm({ schema: ReplySchema, shouldResetAfterSubmit: true })

  const handleSubmit = (data: yup.InferType<typeof ReplySchema>) => {
    return form.handler(() => create({ variables: { data: { postId: post.id, ...data } } }), {
      onSuccess: async (data) => {
        setIsActive(false)
        setSubmitDisabled(true)
        if (image) {
          setImage(null)
          const replyId = data.createReply.id
          const imageKey = (await upload(image.file, { path: UPLOAD_PATHS.replyImage(replyId) })).fileKey
          return form.handler(() => update({ variables: { replyId, data: { image: imageKey } } }))
        }
      },
    })
  }
  const containerHeight = isActive && !image ? "200px" : isActive ? "auto" : "45px"

  return (
    <Stack px={4}>
      {isActive && (
        <NextLink href={`/${post.user.handle}`}>
          <Text fontSize="sm" color="gray.400" pl={14}>
            Replying to{" "}
            <Text as="span" color="blue.500">
              @{post.user.handle}
            </Text>
          </Text>
        </NextLink>
      )}
      <Form {...form} onSubmit={handleSubmit}>
        <Flex mb={3} h={containerHeight} transition="200ms height">
          <Box h="100%" pt={1}>
            <Avatar src={me?.avatar || undefined} boxSize="40px" />
          </Box>
          <Stack pt={0} justify="space-between" h="100%" position="relative">
            <Textarea
              name="text"
              pl={2}
              variant="unstyled"
              placeholder="Post your reply"
              size="lg"
              autoFocus
              bordered={false}
              validations={false}
              onChange={(e) => {
                e.target.value ? setSubmitDisabled(false) : setSubmitDisabled(true)
              }}
              onClick={() => setIsActive(true)}
            />
            {image && (
              <Box pl={3} pb={1} position="relative">
                <IconButton
                  aria-label="remove image"
                  icon={<Box as={CgClose} boxSize="20px" />}
                  position="absolute"
                  top={1}
                  right={1}
                  size="sm"
                  colorScheme="translucent"
                  onClick={() => setImage(null)}
                />
                <Image
                  alt="reply image"
                  src={image.preview}
                  rounded="2xl"
                  objectFit="cover"
                  maxH="400px"
                  w="100%"
                />
              </Box>
            )}
            {isActive && (
              <HStack>
                <AttachImage image={image} setImage={setImage}>
                  <IconButton
                    aria-label="media"
                    icon={<Box as={BiImage} boxSize="22px" />}
                    variant="ghost"
                    color="primary.500"
                  />
                </AttachImage>
              </HStack>
            )}
            <Button
              isDisabled={submitDisabled}
              isLoading={loading}
              type="submit"
              position="absolute"
              bottom={0}
              right={0}
            >
              Reply
            </Button>
          </Stack>
        </Flex>
      </Form>
    </Stack>
  )
}
