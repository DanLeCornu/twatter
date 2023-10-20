import * as React from "react"
import { gql } from "@apollo/client"
import { Box, Button, Center, Heading, Stack, Text } from "@chakra-ui/react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

import type { MutationForgotPasswordArgs } from "lib/graphql"
import { useForgotPasswordMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import { useMe } from "lib/hooks/useMe"
import { useToast } from "lib/hooks/useToast"
import yup from "lib/yup"
import { Form } from "components/Form"
import { Input } from "components/Input"

const _ = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`

const ResetSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
})

export default function ForgotPassword() {
  const { me } = useMe()
  const router = useRouter()

  const defaultValues = { email: me?.email || "" }

  const form = useForm({ schema: ResetSchema, defaultValues })
  const [reset, { loading }] = useForgotPasswordMutation()
  const toast = useToast()

  const handleSubmit = async (variables: MutationForgotPasswordArgs) => {
    return form.handler(() => reset({ variables }), {
      onSuccess: () => {
        toast({ description: "Email has been sent to " + variables.email })
        router.push("/")
      },
    })
  }
  return (
    <Center flexDir="column" pt={10} px={6}>
      <Head>
        <title>Forgot password</title>
      </Head>
      <Box w={["100%", 400]}>
        <Form {...form} onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Heading as="h1">Forgot your password?</Heading>
            <Text>Enter your email below to receive your password reset instructions.</Text>

            <Input autoFocus name="email" placeholder="Email" />
            <Button w="100%" colorScheme="blue" type="submit" isLoading={loading}>
              Send instructions
            </Button>
            {!me && <Link href="/login">Login</Link>}
          </Stack>
        </Form>
      </Box>
    </Center>
  )
}
