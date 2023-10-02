import * as React from "react"
import { BiArrowBack } from "react-icons/bi"
import { BiImage } from "react-icons/bi"
import { gql } from "@apollo/client"
import { Avatar, Box, Button, Flex, HStack, IconButton, useColorModeValue } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { GetPostsDocument, SortOrder, useCreatePostMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import { useMe } from "lib/hooks/useMe"
import yup from "lib/yup"
import { Form } from "components/Form"
import { withAuth } from "components/hoc/withAuth"
import { Textarea } from "components/Textarea"

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
  const [postSubmitDisabled, setPostSubmitDisabled] = React.useState(true)
  const [create, { loading }] = useCreatePostMutation({
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

  const handleSubmit = (data: yup.InferType<typeof PostSchema>) => {
    return form.handler(() => create({ variables: { data } }), {
      onSuccess: () => router.push("/"),
    })
  }

  return (
    <Form {...form} onSubmit={handleSubmit}>
      <Flex justify="space-between" maxW="100vw">
        <NextLink href="/">
          <IconButton
            aria-label="back"
            icon={<Box as={BiArrowBack} boxSize="20px" />}
            variant="ghost"
            m={2}
          />
        </NextLink>
        <Button isDisabled={postSubmitDisabled} isLoading={loading} type="submit" mt={2} mr={4}>
          Post
        </Button>
      </Flex>
      <Flex mx={4} h="180px" borderBottom="1px solid" borderColor={useColorModeValue("gray.100", "gray.700")}>
        <Box h="100%" pt={4}>
          <Avatar src={me?.avatar || undefined} boxSize="40px" />
        </Box>
        <Box pt={6} h="100%">
          <Textarea
            name="text"
            pl={4}
            variant="unstyled"
            placeholder="What is happening?!"
            size="lg"
            autoFocus
            resize="none"
            onChange={(e) => {
              e.target.value ? setPostSubmitDisabled(false) : setPostSubmitDisabled(true)
            }}
          />
        </Box>
      </Flex>
      <HStack mx={4} mt={2}>
        <IconButton
          aria-label="media"
          icon={<Box as={BiImage} boxSize="22px" />}
          variant="ghost"
          color="primary.500"
        />
      </HStack>
    </Form>
  )
}

export default withAuth(NewPost)
