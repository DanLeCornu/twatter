import * as React from "react"
import { gql, useApolloClient } from "@apollo/client"
import { Box, Button, Center, Heading, Spinner, Stack } from "@chakra-ui/react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

import { ACCESS_TOKEN, REFRESH_TOKEN_KEY } from "lib/config"
import type { RegisterInput } from "lib/graphql"
import { MeDocument, useRegisterMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import { useMe } from "lib/hooks/useMe"
import yup from "lib/yup"
import { Form } from "components/Form"
import { FormError } from "components/FormError"
import { Input } from "components/Input"

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

const RegisterSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(8, "Must be at least 8 characters").required("Required"),
  name: yup.string().required("Required"),
  handle: yup.string().required("Required"),
})

export default function Register() {
  const { me, loading } = useMe()
  const client = useApolloClient()
  const router = useRouter()
  const [register, { loading: registerLoading }] = useRegisterMutation()

  const form = useForm({ schema: RegisterSchema })

  const onSubmit = (data: RegisterInput) => {
    return form.handler(() => register({ variables: { data } }), {
      onAppError: form.setAppError,
      onSuccess: async (data) => {
        localStorage.setItem(ACCESS_TOKEN, data.register.token)
        await fetch("/api/login", {
          method: "post",
          body: JSON.stringify({
            [REFRESH_TOKEN_KEY]: data.register.refreshToken,
          }),
        })
        client.writeQuery({ query: MeDocument, data: { me: data.register.user } })
      },
    })
  }

  React.useEffect(() => {
    if (loading || !me || !router.isReady) return
    router.replace(`/`)
  }, [loading, me, router])

  if (loading || me) {
    return (
      <Center minH="100vh">
        <Spinner />
      </Center>
    )
  }
  return (
    <Center flexDir="column" mt={10}>
      <Head>
        <title>Register</title>
      </Head>
      <Box w={["100%", 400]}>
        <Form onSubmit={onSubmit} {...form}>
          <Stack spacing={2}>
            <Heading as="h1">Register</Heading>
            <Input name="email" label="Email" placeholder="jim.bob@gmail.com" />
            <Input name="password" label="Password" type="password" placeholder="********" />
            <Input name="name" label="Twatter name" placeholder="Jim Bob" />
            <Input name="handle" label="Twatter handle" placeholder="Jim" />
            <Button colorScheme="blue" type="submit" w="100%" isLoading={registerLoading}>
              Register
            </Button>
            <FormError />
            <Link href="/login">Already have an account?</Link>
          </Stack>
        </Form>
      </Box>
    </Center>
  )
}

function MetaTags(props: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Register | Twatter</title>
        <meta property="og:title" content="Sign up to Twatter" />
        {/* <meta property="og:image" content={"twatter.jpg"} /> */}
        <meta property="description" content="Twitter without the twat" />
        <meta property="og:description" content="Twitter without the twat" />
      </Head>
      {props.children}
    </>
  )
}

Register.getLayout = (page: React.ReactNode) => <MetaTags>{page}</MetaTags>
