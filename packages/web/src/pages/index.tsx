import * as React from "react"
import { AiOutlineTwitter } from "react-icons/ai"
import { Button, Center, Flex, Heading, Icon, Link, Spinner, Stack, Text } from "@chakra-ui/react"
import Head from "next/head"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { useMe } from "lib/hooks/useMe"

export default function Landing() {
  const router = useRouter()
  const { me, loading } = useMe({ fetchPolicy: "network-only" })

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
    <Stack p={8} spacing={10}>
      <Icon as={AiOutlineTwitter} boxSize="60px" />
      <Stack spacing={1}>
        <Heading as="h1" fontSize="4xl">
          Twatter
        </Heading>
        <Heading as="h2" fontSize="lg" fontWeight="medium">
          Twitter without The Twat
        </Heading>
      </Stack>

      <Stack>
        <Text fontSize="2xl" fontWeight="bold">
          Join today.
        </Text>
        <Stack spacing={1}>
          <NextLink href="/signup">
            <Button w="100%">Create Account</Button>
          </NextLink>
          <Text fontSize="x-small" color="gray.400">
            By signing up, you agree to the <Link>Terms of Service</Link> and <Link>Privacy Policy</Link>,
            including <Link>Cookie Use</Link>.
          </Text>
        </Stack>
      </Stack>

      <Stack>
        <Text fontWeight="medium">Already have an account?</Text>
        <NextLink href="/login">
          <Button variant="outline" w="100%">
            Sign in
          </Button>
        </NextLink>
      </Stack>
      <Stack>
        <Flex flexWrap="wrap" justify="center" pb={2}>
          <Text color="gray.400" fontSize="xs" noOfLines={1} mr={4} mt={1}>
            About
          </Text>
          <Text color="gray.400" fontSize="xs" noOfLines={1} mr={4} mt={1}>
            Terms of Service
          </Text>
          <Text color="gray.400" fontSize="xs" noOfLines={1} mr={4} mt={1}>
            Privacy Policy
          </Text>
          <Text color="gray.400" fontSize="xs" noOfLines={1} mr={4} mt={1}>
            Cookie Policy
          </Text>
          <Text color="gray.400" fontSize="xs" noOfLines={1} mt={1}>
            Cookie Policy
          </Text>
        </Flex>
        <Text color="gray.400" fontSize="xs" textAlign="center">
          © 2023 Twatter.
        </Text>
      </Stack>
    </Stack>
  )
}

function MetaTags(props: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Twatter</title>
        <meta name="description" content="Twatter - Twitter without The Twat" key="description" />
        <meta property="og:title" content="Twatter" key="title" />
        <meta property="og:description" content="Twatter - Twitter without The Twat" key="og:description" />
      </Head>
      {props.children}
    </>
  )
}
Landing.getLayout = (page: React.ReactNode) => <MetaTags>{page}</MetaTags>
