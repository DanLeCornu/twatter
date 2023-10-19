import * as React from "react"
import { AiOutlineTwitter } from "react-icons/ai"
import { CgClose } from "react-icons/cg"
import { gql } from "@apollo/client"
import { Box, Button, Center, Heading, Icon, IconButton, Link, Spinner, Stack, Text } from "@chakra-ui/react"
import * as Sentry from "@sentry/nextjs"
import Head from "next/head"
import NextLink from "next/link"
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
          router.replace("/home")
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
    router.replace("/home")
  }, [loading, me, router])

  if (loading || me)
    return (
      <Center minH="100vh">
        <Spinner />
      </Center>
    )

  return (
    <Center flexDir="column" pt={3} px={6}>
      <NextLink href="/">
        <IconButton
          icon={<Box as={CgClose} boxSize="20px" />}
          aria-label="close"
          colorScheme="monochrome"
          variant="outline"
          border="none"
          position="fixed"
          top={2}
          left={2}
        />
      </NextLink>
      <Icon as={AiOutlineTwitter} boxSize="30px" />
      <Box w={["100%", 400]} px={6} pt={24}>
        <Form onSubmit={onSubmit} {...form}>
          <Stack spacing={8}>
            <Heading as="h1" fontSize="2xl">
              Sign in to Twatter
            </Heading>
            <Stack>
              <Input name="email" label="Email" />
              <Input name="password" label="Password" type="password" />
            </Stack>
            <Button colorScheme="monochrome" type="submit" w="100%" isLoading={loginLoading}>
              Log in
            </Button>
            <FormError />
          </Stack>
        </Form>
        <NextLink href="/forgot-password">
          <Button variant="outline" colorScheme="monochrome" w="100%" mt={6}>
            Forgot password?
          </Button>
        </NextLink>
        <Text pt={16} color="gray.400" fontSize="sm">
          Don't have an account? <Link href="/signup">Sign up</Link>
        </Text>
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
