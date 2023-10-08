import * as React from "react"
import { AiOutlineTwitter } from "react-icons/ai"
import { Box, Button, Center, Flex, Heading, Icon, Spinner, Stack, Text } from "@chakra-ui/react"
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
    <Stack px={6}>
      <Stack px={6} py={6} spacing={14}>
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
          <NextLink href="/signup">
            <Button w="100%">Create Account</Button>
          </NextLink>
          <Text fontSize="x-small" color="gray.400">
            By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
          </Text>
        </Stack>

        <Stack>
          <Text fontWeight="bold">Already have an account?</Text>
          <NextLink href="/login">
            <Button variant="outline" colorScheme="monochrome" color="blue.500" w="100%">
              Sign in
            </Button>
          </NextLink>
        </Stack>
      </Stack>
      <Box position="fixed" bottom={0} left={0} w="100%" py={4}>
        <Flex flexWrap="wrap" justify="center" pb={2}>
          <Text color="gray.400" fontSize="xs" noOfLines={1} mr={4} mt={2}>
            About
          </Text>
          <Text color="gray.400" fontSize="xs" noOfLines={1} mr={4} mt={2}>
            Terms of Service
          </Text>
          <Text color="gray.400" fontSize="xs" noOfLines={1} mr={4} mt={2}>
            Privacy Policy
          </Text>
          <Text color="gray.400" fontSize="xs" noOfLines={1} mr={4} mt={2}>
            Cookie Policy
          </Text>
          <Text color="gray.400" fontSize="xs" noOfLines={1} mt={2}>
            Cookie Policy
          </Text>
        </Flex>
        <Text color="gray.400" fontSize="xs" textAlign="center">
          © 2023 Twatter.
        </Text>
      </Box>
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
