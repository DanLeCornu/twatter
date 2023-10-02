import * as React from "react"
import { gql } from "@apollo/client"
import { Box, Button, Center, Flex, Heading, Spinner, Stack, VStack } from "@chakra-ui/react"
import * as Sentry from "@sentry/nextjs"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

import { ACCESS_TOKEN, REFRESH_TOKEN_KEY } from "lib/config"
import type { LoginInput } from "lib/graphql"
import { useLoginMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import { useMe } from "lib/hooks/useMe"
import yup from "lib/yup"
import { Form } from "components/Form"
import { FormError } from "components/FormError"
import { Input } from "components/Input"

const _ = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        ...Me
      }
      token
      refreshToken
    }
  }
`

const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(8, "Must be at least 8 characters"),
})

export default function Login() {
  const { me, loading } = useMe({ fetchPolicy: "network-only" })

  const [login, { loading: loginLoading }] = useLoginMutation()
  const router = useRouter()

  const form = useForm({ schema: LoginSchema })

  const onSubmit = (data: LoginInput) => {
    return form.handler(() => login({ variables: { data } }), {
      onSuccess: async (data, toast) => {
        try {
          localStorage.setItem(ACCESS_TOKEN, data.login.token)
          await fetch("/api/login", {
            method: "post",
            body: JSON.stringify({ [REFRESH_TOKEN_KEY]: data.login.refreshToken }),
          })
          // router.replace(data.login.user.isAdmin ? "/admin" : "/")
          router.replace("/")
        } catch {
          localStorage.removeItem(ACCESS_TOKEN)
          await fetch("/api/logout", { method: "post" })
          toast({
            title: "There was an error logging in",
            description: "Please refresh the page and try again. We have been notified",
            status: "error",
          })
        }
      },
      onServerError: async (message, toast) => {
        Sentry.captureMessage(message)
        localStorage.removeItem(ACCESS_TOKEN)
        await fetch("/api/logout", { method: "post" })
        toast({
          title: "There was an error logging in",
          description: "Please refresh the page and try again. We have been notified",
          status: "error",
        })
      },
    })
  }

  React.useEffect(() => {
    if (loading || !me) return
    // router.replace(me.isAdmin ? "/admin" : "/")
    router.replace("/")
  }, [loading, me, router])

  if (loading || me)
    return (
      <Center minH="80vh">
        <Spinner />
      </Center>
    )

  return (
    <Center flexDir="column" pt={10} px={6}>
      <Head>
        <title>Login</title>
      </Head>
      <Box w={["100%", 400]}>
        <VStack spacing={1} mb={8}>
          <Heading as="h1" textAlign="center" fontSize={{ base: "xl", md: "3xl" }}>
            Twatter
          </Heading>
          <Heading as="h2" textAlign="center" fontSize={{ base: "sm", md: "lg" }} fontWeight="normal">
            Twitter, without the twat
          </Heading>
        </VStack>

        <Form onSubmit={onSubmit} {...form}>
          <Stack spacing={2}>
            <Heading as="h3" fontSize="xl">
              Login
            </Heading>

            <Input name="email" label="Email" placeholder="jim@gmail.com" />
            <Input name="password" label="Password" type="password" placeholder="********" />
            <Button colorScheme="blue" type="submit" w="100%" isLoading={loginLoading}>
              Login
            </Button>
            <FormError />
            <Flex justify="space-between">
              <Link href="/register">Register</Link>
              <Link href="/forgot-password">Forgot password?</Link>
            </Flex>
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
        <title>Login | Twatter</title>
        <meta name="description" content="Login to Twatter!" key="description" />
        <meta property="og:title" content="Twatter - Login" key="title" />
        <meta property="og:description" content="Login to Twatter!" key="og:description" />
      </Head>
      {props.children}
    </>
  )
}
Login.getLayout = (page: React.ReactNode) => <MetaTags>{page}</MetaTags>
