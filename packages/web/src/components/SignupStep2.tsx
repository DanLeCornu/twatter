import * as React from "react"
import { gql, useApolloClient } from "@apollo/client"
import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"

import { ACCESS_TOKEN, REFRESH_TOKEN_KEY } from "lib/config"
import { MeDocument, useRegisterMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import yup from "lib/yup"

import { Form } from "./Form"
import { Input } from "./Input"

const _ = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      user {
        ...Me
      }
      token
      refreshToken
    }
  }
`

const Step2Schema = yup.object().shape({
  verificationCode: yup.string(),
})

interface Props {
  email: string
}

export function SignupStep2({ email }: Props) {
  const router = useRouter()
  const client = useApolloClient()
  const form = useForm({ schema: Step2Schema })

  const [isDisabled, setIsDisabled] = React.useState(true)

  const [register, { loading }] = useRegisterMutation()

  const onSubmit = (data: yup.InferType<typeof Step2Schema>) => {
    if (!data.verificationCode) return
    return form.handler(
      () => register({ variables: { data: { verificationCode: data.verificationCode || "", email } } }),
      {
        onSuccess: async (res) => {
          router.replace("/onboarding")
          localStorage.setItem(ACCESS_TOKEN, res.register.token)
          await fetch("/api/login", {
            method: "post",
            body: JSON.stringify({
              [REFRESH_TOKEN_KEY]: res.register.refreshToken,
            }),
          })
          client.writeQuery({ query: MeDocument, data: { me: res.register.user } })
        },
      },
    )
  }
  return (
    <Form onSubmit={onSubmit} {...form}>
      <Stack spacing={6}>
        <Stack spacing={1}>
          <Heading as="h1" fontSize="2xl" pt={8}>
            We sent you a code
          </Heading>
          <Text color="gray.400" fontSize="sm">
            Enter it below to verify {email}
          </Text>
        </Stack>
        <Stack spacing={0}>
          <Input
            name="verificationCode"
            label="Verification code"
            autoFocus
            // type="number"
            onBlur={(e) => {
              if (e.target.value) {
                setIsDisabled(false)
              } else {
                setIsDisabled(true)
              }
            }}
          />
          <Flex pl={2}>
            <Button variant="link" color="blue.500" size="sm" fontWeight="normal">
              Resend code
            </Button>
          </Flex>
        </Stack>
      </Stack>
      <Stack py={6} px={8} position="fixed" bottom={0} left={0} w="100%">
        <Button
          type="submit"
          size="lg"
          w="100%"
          colorScheme="monochrome"
          isDisabled={isDisabled}
          isLoading={loading}
        >
          Next
        </Button>
      </Stack>
    </Form>
  )
}
