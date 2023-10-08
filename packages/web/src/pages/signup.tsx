import * as React from "react"
import { CgClose } from "react-icons/cg"
import { Box, Center, IconButton, Spinner, Stack, Text } from "@chakra-ui/react"
import Head from "next/head"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { useMe } from "lib/hooks/useMe"
import { SignupStep1 } from "components/SignupStep1"
import { SignupStep2 } from "components/SignupStep2"

export default function Signup() {
  const router = useRouter()
  const { me, loading } = useMe()

  const [step, setStep] = React.useState(1)
  const [email, setEmail] = React.useState("")

  React.useEffect(() => {
    if (loading || !me || !router.isReady) return
    router.replace("/home")
  }, [loading, me, router])

  if (loading || me) {
    return (
      <Center minH="100vh">
        <Spinner />
      </Center>
    )
  }
  return (
    <Stack pt={1} px={6}>
      <Head>
        <title>Sign up for Twatter</title>
      </Head>
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
      <Text fontWeight="bold" fontSize="xl" pl={12}>
        Step {step} of 4
      </Text>
      {step === 1 ? <SignupStep1 setStep={setStep} setEmail={setEmail} /> : <SignupStep2 email={email} />}
    </Stack>
  )
}

function MetaTags(props: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Register | Twatter</title>
        <meta property="og:title" content="Sign up to Twatter" />
        {/* <meta property="og:image" content={"twatter.jpg"} /> */}
        <meta property="description" content="Twitter without The Twat" />
        <meta property="og:description" content="Twitter without The Twat" />
      </Head>
      {props.children}
    </>
  )
}

Signup.getLayout = (page: React.ReactNode) => <MetaTags>{page}</MetaTags>
