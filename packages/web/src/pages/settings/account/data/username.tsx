import { BiArrowBack } from "react-icons/bi"
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"

import { MeDocument, useUpdateProfileMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import { useMe } from "lib/hooks/useMe"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import yup from "lib/yup"
import { ButtonGroup } from "components/ButtonGroup"
import { Form } from "components/Form"
import { withAuth } from "components/hoc/withAuth"
import { HEADING_CONTAINER_HEIGHT, HomeLayout } from "components/HomeLayout"
import { Input } from "components/Input"

export const UsernameSchema = yup.object().shape({
  handle: yup.string().min(3, "Minimum 3 characters").max(15, "Maximum 15 characters").required("Required"),
})

function AccountDataUsernameSettings() {
  const { me, loading } = useMe()
  const router = useRouter()

  const [update, { loading: updateLoading }] = useUpdateProfileMutation({
    refetchQueries: [{ query: MeDocument }],
  })

  const defaultValues = { handle: me?.handle || "" }

  const form = useForm({ schema: UsernameSchema, defaultValues })

  const handleSubmit = (data: yup.InferType<typeof UsernameSchema>) => {
    return form.handler(() => update({ variables: { data } }), {
      onSuccess: (_, toast) => {
        router.replace("/settings/account/data")
        toast({ description: "Username updated" })
      },
    })
  }

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)

  if (loading)
    return (
      <Center>
        <Spinner />
      </Center>
    )
  if (!me) return null
  return (
    <Box>
      <Head>
        <title>Settings / Twatter</title>
      </Head>
      <HStack
        position="fixed"
        top={0}
        left={0}
        w="100%"
        h={HEADING_CONTAINER_HEIGHT + "px"}
        zIndex={1}
        p={2}
        backdropFilter="blur(10px)"
        bgColor={bgColor}
      >
        <IconButton
          aria-label="back"
          icon={<Box as={BiArrowBack} boxSize="20px" />}
          variant="ghost"
          onClick={() => router.back()}
        />

        <Stack spacing={0}>
          <Heading fontSize="md">Change username</Heading>
          <Text color="gray.400" fontSize="xs">
            @{me?.handle}
          </Text>
        </Stack>
      </HStack>
      <Stack mt={HEADING_CONTAINER_HEIGHT + "px"} py={2}>
        <Form {...form} onSubmit={handleSubmit}>
          <Stack px={4} spacing={4}>
            <Input name="handle" label="Username" maxLength={15} />
            <ButtonGroup>
              <Button size="sm" type="submit" isLoading={updateLoading}>
                Save
              </Button>
            </ButtonGroup>
          </Stack>
        </Form>
      </Stack>
    </Box>
  )
}

AccountDataUsernameSettings.getLayout = (page: React.ReactNode) => (
  <HomeLayout showCreateButton={false}>{page}</HomeLayout>
)

export default withAuth(AccountDataUsernameSettings)
