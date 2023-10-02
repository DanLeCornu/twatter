import * as React from "react"
import { BiImage } from "react-icons/bi"
import { Avatar, Box, Button, Flex, HStack, IconButton, Stack, useColorModeValue } from "@chakra-ui/react"
import { PostSchema } from "pages/posts/new"

import { GetPostsDocument, SortOrder, useCreatePostMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import { useMe } from "lib/hooks/useMe"
import type yup from "lib/yup"

import { Form } from "./Form"
import { Textarea } from "./Textarea"

export function HomeCreatePostForm() {
  const { me } = useMe()
  const [postSubmitDisabled, setPostSubmitDisabled] = React.useState(true)
  const [create, { loading }] = useCreatePostMutation({
    refetchQueries: [{ query: GetPostsDocument, variables: { orderBy: { createdAt: SortOrder.Desc } } }],
  })

  const form = useForm({ schema: PostSchema, shouldResetAfterSubmit: true })

  const handleSubmit = (data: yup.InferType<typeof PostSchema>) => {
    return form.handler(() => create({ variables: { data } }))
  }

  return (
    <Form {...form} onSubmit={handleSubmit}>
      <Flex px={4} h="180px" borderBottom="1px solid" borderColor={useColorModeValue("gray.100", "gray.700")}>
        <Box h="100%" pt={4}>
          <Avatar src={me?.avatar || undefined} boxSize="40px" />
        </Box>
        <Stack pt={4} justify="space-between" h="100%">
          <Textarea
            name="text"
            pl={4}
            variant="unstyled"
            placeholder="What is happening?!"
            size="lg"
            autoFocus
            resize="none"
            bordered={false}
            validations={false}
            onChange={(e) => {
              e.target.value ? setPostSubmitDisabled(false) : setPostSubmitDisabled(true)
            }}
          />
          <HStack justify="space-between" pb={2}>
            <HStack>
              <IconButton
                aria-label="media"
                icon={<Box as={BiImage} boxSize="22px" />}
                variant="ghost"
                color="primary.500"
              />
            </HStack>
            <Button isDisabled={postSubmitDisabled} isLoading={loading} type="submit">
              Post
            </Button>
          </HStack>
        </Stack>
      </Flex>
    </Form>
  )
}
