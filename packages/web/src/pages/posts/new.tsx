import * as React from "react"
import { BiArrowBack } from "react-icons/bi"
import { BiImage } from "react-icons/bi"
import { CgClose } from "react-icons/cg"
import { gql } from "@apollo/client"
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { useRouter } from "next/router"

import { GetPostsDocument, SortOrder, useCreatePostMutation, useUpdatePostMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import { useMe } from "lib/hooks/useMe"
import { useS3Upload } from "lib/hooks/useS3"
import { UPLOAD_PATHS } from "lib/uploadPaths"
import yup from "lib/yup"
import type { AttachedImage } from "components/AttachImage"
import { AttachImage } from "components/AttachImage"
import { Form } from "components/Form"
import { withAuth } from "components/hoc/withAuth"
import { Modal } from "components/Modal"
import { PostTextArea } from "components/PostTextArea"

const _ = gql`
  mutation CreatePost($data: CreatePostInput!) {
    createPost(data: $data) {
      ...PostItem
    }
  }
`

export const PostSchema = yup.object().shape({
  text: yup.string().required(),
})

function NewPost() {
  const { me } = useMe()
  const router = useRouter()
  const modalProps = useDisclosure()

  const [tags, setTags] = React.useState<string[]>([])
  const [handles, setHandles] = React.useState<string[]>([])
  const [submitDisabled, setSubmitDisabled] = React.useState(true)
  const [image, setImage] = React.useState<AttachedImage | null>(null)

  const [create, { loading: createloading }] = useCreatePostMutation({
    refetchQueries: [
      {
        query: GetPostsDocument,
        variables: {
          orderBy: { createdAt: SortOrder.Desc },
          where: { user: { is: { handle: { equals: me?.handle } } } },
        },
      },
    ],
  })

  const form = useForm({ schema: PostSchema })

  const [upload] = useS3Upload()
  const [update] = useUpdatePostMutation()

  const handleSubmit = (data: yup.InferType<typeof PostSchema>) => {
    // TODO check if there is one last tag without a space at the end, and add it to the tags list
    const mentionCreates = handles.map((handle) => ({
      user: { connect: { handle } },
    }))
    const tagConnectOrCreate = tags.map((tag) => ({
      where: { name: tag },
      create: { name: tag },
    }))
    return form.handler(
      () =>
        create({
          variables: {
            data: {
              text: data.text,
              tags: { connectOrCreate: tagConnectOrCreate },
              mentions: { create: mentionCreates },
            },
          },
        }),
      {
        onSuccess: async (data, toast) => {
          router.push("/home")
          if (image) {
            const postId = data.createPost.id
            const imageKey = (await upload(image.file, { path: UPLOAD_PATHS.postImage(postId) })).fileKey
            return form.handler(() => update({ variables: { postId, data: { image: imageKey } } }))
          }
          await new Promise((res) => setTimeout(res, 1000)) // wait a second before showing the toast
          toast({ description: "Your post was sent", link: `/posts/${data.createPost.id}`, linkText: "View" })
        },
      },
    )
  }

  return (
    <Form {...form} onSubmit={handleSubmit}>
      <Flex justify="space-between" maxW="100vw">
        <IconButton
          aria-label="back"
          icon={<Box as={BiArrowBack} boxSize="20px" />}
          variant="ghost"
          m={2}
          onClick={() => (!!form.getValues("text") ? modalProps.onOpen() : router.back())}
        />
        <Button
          isDisabled={submitDisabled}
          isLoading={createloading}
          type="submit"
          mt={2}
          mr={3}
          px={4}
          size="sm"
        >
          Post
        </Button>
      </Flex>
      <Flex mx={4}>
        <Box h="100%" pt={4}>
          <Avatar src={me?.avatar || undefined} boxSize="40px" />
        </Box>
        <Stack pt={3} justify="space-between">
          {/* INPUT */}
          <PostTextArea
            hasImage={!!image}
            setSubmitDisabled={setSubmitDisabled}
            tags={tags}
            setTags={setTags}
            handles={handles}
            setHandles={setHandles}
            form={form}
          />
          {image && (
            <Box pl={3} pb={4} position="relative">
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
      </Flex>
      <Box px={4}>
        <Divider />
      </Box>
      <HStack mx={4} mt={2}>
        <AttachImage image={image} setImage={setImage}>
          <IconButton
            aria-label="media"
            icon={<Box as={BiImage} boxSize="22px" />}
            variant="ghost"
            color="primary.500"
          />
        </AttachImage>
      </HStack>

      {/* DISCARD CHANGES MODAL */}
      <Modal {...modalProps} title="Discard post?">
        <Text mb={6} fontSize="15px" color="gray.400">
          This can't be undone and you'll lose your changes
        </Text>
        <Stack>
          <Button w="100%" bg="red" _hover={{ bg: "red" }} onClick={() => router.back()}>
            Discard
          </Button>
          <Button colorScheme="monochrome" variant="outline" onClick={modalProps.onClose}>
            Cancel
          </Button>
        </Stack>
      </Modal>
    </Form>
  )
}

export default withAuth(NewPost)
