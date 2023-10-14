import * as React from "react"
import { CgClose } from "react-icons/cg"
import { Box, Center, HStack, IconButton, Spinner, Text, useColorModeValue } from "@chakra-ui/react"
import Head from "next/head"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { useMe } from "lib/hooks/useMe"
import { SignupStep1 } from "components/SignupStep1"
import { SignupStep2 } from "components/SignupStep2"
import { BiArrowBack } from "react-icons/bi"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"

export default function Signup() {
  const router = useRouter()
  const { me, loading } = useMe()

  const [step, setStep] = React.useState(1)
  const [email, setEmail] = React.useState("")

  React.useEffect(() => {
    if (loading || !me || !router.isReady) return
    router.replace("/home")
  }, [loading, me, router])

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)

  if (loading || me) {
    return (
      <Center minH="100vh">
        <Spinner />
      </Center>
    )
  }
  return (
    <Box minH="100vh">
      <Head>
        <title>Sign up for Twatter</title>
      </Head>
      <HStack
        position="fixed"
        top={0}
        left={0}
        spacing={6}
        bg={bgColor}
        w="100%"
        py={2}
        backdropFilter="blur(10px)"
        zIndex={1}
      >
        {step === 1 ? (
          <NextLink href="/">
            <IconButton icon={<Box as={CgClose} boxSize="20px" />} aria-label="close" variant="ghost" />
          </NextLink>
        ) : (
          <IconButton
            icon={<Box as={BiArrowBack} boxSize="20px" />}
            aria-label="close"
            variant="ghost"
            onClick={() => setStep(1)}
          />
        )}
        <Text fontWeight="bold" fontSize="xl">
          Step {step} of 5
        </Text>
      </HStack>
      <Box px={6} pt={12}>
        {step === 1 ? <SignupStep1 setStep={setStep} setEmail={setEmail} /> : <SignupStep2 email={email} />}
      </Box>
    </Box>
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
