import * as React from "react"
import { BiArrowBack } from "react-icons/bi"
import { BiImage } from "react-icons/bi"
import { CgClose } from "react-icons/cg"
import { gql } from "@apollo/client"
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Image,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import {
  GetPostsDocument,
  SortOrder,
  useCreateReplyMutation,
  useGetPostQuery,
  useUpdateReplyMutation,
} from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import { useMe } from "lib/hooks/useMe"
import { useS3Upload } from "lib/hooks/useS3"
import { UPLOAD_PATHS } from "lib/uploadPaths"
import yup from "lib/yup"
import type { AttachedImage} from "components/AttachImage";
import { AttachImage } from "components/AttachImage"
import { Form } from "components/Form"
import { withAuth } from "components/hoc/withAuth"
import { ItemHeading } from "components/ItemHeading"
import { NoData } from "components/NoData"
import { Textarea } from "components/Textarea"

const _ = gql`
  mutation CreateReply($data: CreateReplyInput!) {
    createReply(data: $data) {
      ...ReplyItem
    }
  }
  mutation UpdateReply($replyId: String!, $data: ReplyUpdateInput!) {
    updateReply(replyId: $replyId, data: $data) {
      ...ReplyItem
    }
  }
`

export const ReplySchema = yup.object().shape({
  text: yup.string().required(),
})

function NewReply() {
  const { me } = useMe()
  const router = useRouter()
  const postId = router.query.postId as string
  const [submitDisabled, setSubmitDisabled] = React.useState(true)
  const [image, setImage] = React.useState<AttachedImage | null>(null)

  const { data, loading } = useGetPostQuery({
    fetchPolicy: "cache-and-network",
    variables: { where: { id: { equals: postId } } },
    skip: !!!postId,
  })
  const post = data?.post

  const [create, { loading: submitLoading }] = useCreateReplyMutation({
    refetchQueries: [{ query: GetPostsDocument, variables: { orderBy: { createdAt: SortOrder.Desc } } }],
  })
  const [upload] = useS3Upload()
  const [update] = useUpdateReplyMutation()

  const form = useForm({ schema: ReplySchema })

  const handleSubmit = (data: yup.InferType<typeof ReplySchema>) => {
    if (!post) return
    return form.handler(() => create({ variables: { data: { postId, ...data } } }), {
      onSuccess: async (data) => {
        router.push(`/posts/${postId}`)
        if (image) {
          const replyId = data.createReply.id
          const imageKey = (await upload(image.file, { path: UPLOAD_PATHS.replyImage(replyId) })).fileKey
          return form.handler(() => update({ variables: { replyId, data: { image: imageKey } } }))
        }
      },
    })
  }

  const dividerColor = useColorModeValue("gray.400", "gray.600")

  if (loading && !post)
    return (
      <Center minH="80vh">
        <Spinner />
      </Center>
    )
  if (!post)
    return (
      <Center minH="80vh">
        <NoData>Post not found</NoData>
      </Center>
    )
  return (
    <Form {...form} onSubmit={handleSubmit}>
      <Flex justify="space-between" maxW="100vw">
        <NextLink href={`/posts/${postId}`}>
          <IconButton
            aria-label="back"
            icon={<Box as={BiArrowBack} boxSize="20px" />}
            variant="ghost"
            m={2}
          />
        </NextLink>
        <Button isDisabled={submitDisabled} isLoading={submitLoading} type="submit" mt={3} mr={4} size="sm">
          Reply
        </Button>
      </Flex>

      {/* POST */}
      <HStack px={4} pt={2} align="flex-start" maxW="calc(100vw - 40px)">
        <Stack align="center" spacing={1}>
          <Avatar src={post.user.avatar || undefined} boxSize="40px" />
          <Box w="2px" bg={dividerColor} minH="50px" />
        </Stack>
        <Stack
          spacing={0}
          w="100%" // Needed to prevent user name width collapsing
          pr={4}
        >
          <ItemHeading item={post} noPopover />
          <Stack justify="space-between">
            <Text fontSize="sm" w="100%">
              {post.text}
            </Text>
            <NextLink href={`/${post.user.handle}`}>
              <HStack spacing={1}>
                <Text color="gray.500" whiteSpace="nowrap" fontSize="15px">
                  Replying to
                </Text>
                <Text
                  color="primary.500"
                  fontSize="15px"
                  _hover={{ textDecoration: "underline" }}
                  noOfLines={1}
                  maxW="70%"
                >
                  @{post.user.handle}
                </Text>
              </HStack>
            </NextLink>
          </Stack>
        </Stack>
      </HStack>

      {/* REPLY */}
      <Stack spacing={4}>
        <HStack h={image ? "auto" : "160px"} align="flex-start" spacing={2}>
          <Box h="100%" pt={4} pl={4}>
            <Avatar src={me?.avatar || undefined} boxSize="40px" />
          </Box>
          <Stack pt={3} pr={5} justify="space-between" h="100%">
            <Textarea
              name="text"
              variant="unstyled"
              placeholder="Post your reply"
              size="lg"
              autoFocus
              bordered={false}
              validations={false}
              onChange={(e) => {
                e.target.value ? setSubmitDisabled(false) : setSubmitDisabled(true)
              }}
            />
            {image && (
              <Box position="relative">
                <IconButton
                  aria-label="remove image"
                  icon={<Box as={CgClose} boxSize="18px" />}
                  position="absolute"
                  top={1}
                  right={1}
                  size="sm"
                  colorScheme="translucent"
                  onClick={() => setImage(null)}
                />
                <Image
                  alt="post image"
                  src={image.preview}
                  rounded="2xl"
                  objectFit="cover"
                  maxH="400px"
                  w="100%"
                />
              </Box>
            )}
          </Stack>
        </HStack>
        <HStack px={4}>
          <AttachImage image={image} setImage={setImage}>
            <IconButton
              aria-label="media"
              icon={<Box as={BiImage} boxSize="22px" />}
              variant="ghost"
              color="primary.500"
            />
          </AttachImage>
        </HStack>
      </Stack>
    </Form>
  )
}

export default withAuth(NewReply)
