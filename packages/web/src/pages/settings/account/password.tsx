import { BiArrowBack } from "react-icons/bi"
import { gql } from "@apollo/client"
import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  IconButton,
  Link,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import Head from "next/head"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { useUpdatePasswordMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import { useMe } from "lib/hooks/useMe"
import { useToast } from "lib/hooks/useToast"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import yup from "lib/yup"
import { ButtonGroup } from "components/ButtonGroup"
import { Form } from "components/Form"
import { withAuth } from "components/hoc/withAuth"
import { HEADING_CONTAINER_HEIGHT, HomeLayout } from "components/HomeLayout"
import { Input } from "components/Input"

const _ = gql`
  mutation UpdatePassword($data: UpdatePasswordInput!) {
    updatePassword(data: $data)
  }
`

export const PasswordSchema = yup.object().shape({
  currentPassword: yup.string().required().min(8, "Must be at least 8 characters"),
  newPassword: yup.string().required().min(8, "Must be at least 8 characters"),
  confirmPassword: yup.string().required().min(8, "Must be at least 8 characters"),
})

function AccountPasswordSettings() {
  const toast = useToast()
  const { me, loading } = useMe()
  const router = useRouter()

  const [update, { loading: updateLoading }] = useUpdatePasswordMutation()

  const form = useForm({ schema: PasswordSchema })

  const handleSubmit = (values: yup.InferType<typeof PasswordSchema>) => {
    const { confirmPassword, ...data } = values
    if (confirmPassword !== data.newPassword) {
      toast({ description: "Passwords don't match" })
      return
    }
    return form.handler(() => update({ variables: { data } }), {
      onSuccess: (_, toast) => {
        router.replace("/settings/account")
        toast({ description: "Password updated" })
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
          <Heading fontSize="md">Change your password</Heading>
          <Text color="gray.400" fontSize="xs">
            @{me?.handle}
          </Text>
        </Stack>
      </HStack>
      <Stack mt={HEADING_CONTAINER_HEIGHT + "px"} py={2}>
        <Form {...form} onSubmit={handleSubmit}>
          <Stack px={4} spacing={4}>
            <Stack spacing={0}>
              <Input name="currentPassword" label="Current password" type="password" />
              <NextLink href="/forgot-password">
                <Link fontSize="xs">Forgot password?</Link>
              </NextLink>
            </Stack>
            <Divider />
            <Input name="newPassword" label="New Password" type="password" />
            <Input name="confirmPassword" label="Confirm Password" type="password" />
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

AccountPasswordSettings.getLayout = (page: React.ReactNode) => (
  <HomeLayout showCreateButton={false}>{page}</HomeLayout>
)

export default withAuth(AccountPasswordSettings)
