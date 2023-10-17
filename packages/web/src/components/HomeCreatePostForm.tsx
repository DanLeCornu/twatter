import * as React from "react"
import { BiImage } from "react-icons/bi"
import { CgClose } from "react-icons/cg"
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
  useColorModeValue,
} from "@chakra-ui/react"
import { PostSchema } from "pages/posts/new"

import { GetPostsDocument, SortOrder, useCreatePostMutation, useUpdatePostMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import { useMe } from "lib/hooks/useMe"
import { useS3Upload } from "lib/hooks/useS3"
import { UPLOAD_PATHS } from "lib/uploadPaths"
import type yup from "lib/yup"

import type { AttachedImage } from "./AttachImage"
import { AttachImage } from "./AttachImage"
import { Form } from "./Form"
import { Textarea } from "./Textarea"

export function DesktopHomeCreatePostForm() {
  const { me } = useMe()
  const [submitDisabled, setSubmitDisabled] = React.useState(true)
  const [isActive, setIsActive] = React.useState(false)
  const [image, setImage] = React.useState<AttachedImage | null>(null)
  const [tags, setTags] = React.useState<string[]>([])
  // TODO finish tagging system here

  const [create, { loading }] = useCreatePostMutation({
    refetchQueries: [
      {
        query: GetPostsDocument,
        variables: { orderBy: { createdAt: SortOrder.Desc }, where: { userId: { not: { equals: me?.id } } } },
      },
    ],
  })

  const [upload] = useS3Upload()
  const [update] = useUpdatePostMutation()

  const form = useForm({ schema: PostSchema, shouldResetAfterSubmit: true })

  const handleSubmit = (data: yup.InferType<typeof PostSchema>) => {
    const connectOrCreate = tags.map((tag) => ({
      where: { name: tag },
      create: { name: tag },
    }))
    return form.handler(
      () =>
        create({
          variables: {
            data: {
              text: data.text,
              tags: { connectOrCreate },
            },
          },
        }),
      {
        onSuccess: async (data) => {
          setIsActive(false)
          if (image) {
            setImage(null)
            const postId = data.createPost.id
            const imageKey = (await upload(image.file, { path: UPLOAD_PATHS.postImage(postId) })).fileKey
            return form.handler(() => update({ variables: { postId, data: { image: imageKey } } }))
          }
        },
      },
    )
  }

  const textAreaHeight = isActive && !image ? "105px" : isActive ? "auto" : "50px"
  const containerHeight = isActive && !image ? "190px" : isActive ? "auto" : "125px"

  return (
    <Form {...form} onSubmit={handleSubmit}>
      <Flex
        px={4}
        h={containerHeight}
        transition="200ms height"
        borderBottom="1px solid"
        borderColor={useColorModeValue("gray.100", "gray.700")}
      >
        <Box h="100%" pt={4}>
          <Avatar src={me?.avatar || undefined} boxSize="40px" />
        </Box>
        <Stack pt={3} justify="space-between" h="100%">
          <Textarea
            h={textAreaHeight}
            transition="200ms height"
            name="text"
            pl={1}
            variant="unstyled"
            placeholder="What is happening?!"
            size="lg"
            autoFocus
            resize="none"
            bordered={false}
            validations={false}
            onChange={(e) => {
              e.target.value ? setSubmitDisabled(false) : setSubmitDisabled(true)
            }}
            onClick={() => setIsActive(true)}
          />
          {image && (
            <Box pl={3} position="relative">
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
          <Divider display={isActive ? "block" : "none"} />
          <HStack justify="space-between" pb={2}>
            <HStack>
              <AttachImage image={image} setImage={setImage}>
                <IconButton
                  aria-label="media"
                  icon={<Box as={BiImage} boxSize="22px" />}
                  variant="ghost"
                  color="primary.500"
                  onClick={() => setIsActive(true)}
                />
              </AttachImage>
            </HStack>
            <Button isDisabled={submitDisabled} isLoading={loading} type="submit">
              Post
            </Button>
          </HStack>
        </Stack>
      </Flex>
    </Form>
  )
}
