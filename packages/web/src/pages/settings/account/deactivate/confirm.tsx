import { BiArrowBack } from "react-icons/bi"
import { gql } from "@apollo/client"
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

import { useDeactivateAccountMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import { useLogout } from "lib/hooks/useLogout"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import yup from "lib/yup"
import { ButtonGroup } from "components/ButtonGroup"
import { Form } from "components/Form"
import { withAuth } from "components/hoc/withAuth"
import { HEADING_CONTAINER_HEIGHT, HomeLayout } from "components/HomeLayout"
import { Input } from "components/Input"

const _ = gql`
  mutation DeactivateAccount($data: DeactivateAccountInput!) {
    deactivateAccount(data: $data)
  }
`

export const ConfirmDeactivateSchema = yup.object().shape({
  password: yup.string().required().min(8, "Must be at least 8 characters"),
})

function AccountConfirmDeactivateSettings() {
  const { me, loading } = useMe()
  const handler = useMutationHandler()
  const logout = useLogout()
  const router = useRouter()

  const [deactivate, { loading: deactivateLoading }] = useDeactivateAccountMutation()

  const handleSubmit = (data: yup.InferType<typeof ConfirmDeactivateSchema>) => {
    return handler(() => deactivate({ variables: { data } }), {
      onSuccess: (_, toast) => {
        logout()
        toast({ description: "Successfully deactivated account" })
      },
    })
  }

  const form = useForm({ schema: ConfirmDeactivateSchema })

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
          <Heading fontSize="md">Confirm your password</Heading>
          <Text color="gray.400" fontSize="xs">
            @{me?.handle}
          </Text>
        </Stack>
      </HStack>
      <Stack mt={HEADING_CONTAINER_HEIGHT + "px"} py={2} px={4}>
        <Heading fontSize="lg">Confirm your password</Heading>
        <Text color="gray.400" fontSize="xs">
          Complete your deactivation request by entering the password associated with your account.
        </Text>
        <Form {...form} onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Input name="password" label="Password" type="password" />
            <ButtonGroup>
              <Button
                size="sm"
                bg="red.500"
                _hover={{ bg: "red.500" }}
                type="submit"
                isLoading={deactivateLoading}
              >
                Deactivate
              </Button>
            </ButtonGroup>
          </Stack>
        </Form>
      </Stack>
    </Box>
  )
}

AccountConfirmDeactivateSettings.getLayout = (page: React.ReactNode) => (
  <HomeLayout showCreateButton={false}>{page}</HomeLayout>
)

export default withAuth(AccountConfirmDeactivateSettings)
