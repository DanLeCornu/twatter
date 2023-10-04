import * as React from "react"
import { BiImage } from "react-icons/bi"
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react"
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
  const [isActive, setIsActive] = React.useState(false)

  const [create, { loading }] = useCreatePostMutation({
    refetchQueries: [{ query: GetPostsDocument, variables: { orderBy: { createdAt: SortOrder.Desc } } }],
  })

  const form = useForm({ schema: PostSchema, shouldResetAfterSubmit: true })

  const handleSubmit = (data: yup.InferType<typeof PostSchema>) => {
    return form.handler(() => create({ variables: { data } }))
  }

  return (
    <Form {...form} onSubmit={handleSubmit}>
      <Flex
        px={4}
        h={isActive ? "190px" : "125px"}
        transition="200ms height"
        borderBottom="1px solid"
        borderColor={useColorModeValue("gray.100", "gray.700")}
      >
        <Box h="100%" pt={4}>
          <Avatar src={me?.avatar || undefined} boxSize="40px" />
        </Box>
        <Stack pt={2} justify="space-between" h="100%">
          <Textarea
            h={isActive ? "105px" : "50px"}
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
              e.target.value ? setPostSubmitDisabled(false) : setPostSubmitDisabled(true)
            }}
            onClick={() => setIsActive(true)}
          />
          <Divider display={isActive ? "block" : "none"} />
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
