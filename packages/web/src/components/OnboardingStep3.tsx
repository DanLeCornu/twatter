import * as React from "react"
import { TbCameraPlus } from "react-icons/tb"
import { gql } from "@apollo/client"
import { Avatar, Button, Center, Flex, Heading, Icon, Spinner, Stack, Text } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { MeDocument, useUpdateAvatarMutation } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"
import { UPLOAD_PATHS } from "lib/uploadPaths"

import { ImageUploader } from "./ImageUploader"
import { NoData } from "./NoData"

const _ = gql`
  mutation UpdateAvatar($data: UpdateUserInput!) {
    updateMe(data: $data) {
      id
      avatar
    }
  }
`

export function OnboardingStep3() {
  const router = useRouter()
  const { me, loading } = useMe()
  const handler = useMutationHandler()

  const [update] = useUpdateAvatarMutation({ refetchQueries: [{ query: MeDocument }] })

  const updateAvatar = (avatar: string | null) => {
    return handler(() => update({ variables: { data: { avatar } } }), {
      onSuccess: () => {
        router.replace("/home")
      },
    })
  }

  if (loading)
    return (
      <Center minH="100vh">
        <Spinner />
      </Center>
    )
  if (!loading && !me)
    return (
      <Center minH="100vh">
        <NoData>User not found</NoData>
      </Center>
    )
  if (!me) return null
  return (
    <>
      <Stack spacing={6}>
        <Stack spacing={1}>
          <Heading as="h1" fontSize="2xl" pt={8}>
            Pick a profile picutre
          </Heading>
          <Text color="gray.400" fontSize="sm">
            Have a favourite selfie? Upload it now.
          </Text>
        </Stack>
        <Center pt="60px">
          <ImageUploader
            dropzoneOptions={{ maxSize: 1000000 }}
            path={UPLOAD_PATHS.userAvatar(me.id)}
            onSubmit={updateAvatar}
            type="avatar"
          >
            <Avatar src={me.avatar || undefined} boxSize="200px" />
            <Center position="absolute" top={0} left={0} w="100%" h="100%" zIndex={1}>
              <Flex rounded="full" bg="rgba(0, 0, 0, 0.5)" p={2}>
                <Icon as={TbCameraPlus} boxSize="24px" />
              </Flex>
            </Center>
          </ImageUploader>
        </Center>
      </Stack>
      <Stack pb={3} px={8} position="fixed" bottom={0} left={0} w="100%">
        <NextLink href="/home">
          <Button size="lg" w="100%" colorScheme="monochrome" variant="outline">
            Skip for now
          </Button>
        </NextLink>
      </Stack>
    </>
  )
}
