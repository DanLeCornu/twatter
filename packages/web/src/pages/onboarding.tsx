import * as React from "react"
import { CgClose } from "react-icons/cg"
import { Box, Center, HStack, IconButton, Spinner, Text, useColorModeValue } from "@chakra-ui/react"
import Head from "next/head"
import NextLink from "next/link"

import { useLogout } from "lib/hooks/useLogout"
import { useMe } from "lib/hooks/useMe"
import { withAuth } from "components/hoc/withAuth"
import { NoData } from "components/NoData"
import { OnboardingStep1 } from "components/OnboardingStep1"
import { OnboardingStep2 } from "components/OnboardingStep2"
import { OnboardingStep3 } from "components/OnboardingStep3"
import { WHITE_RGB, BG_DARK_RGB } from "lib/theme/colors"

function Onboarding() {
  const { me, loading } = useMe()
  const logout = useLogout()
  const [step, setStep] = React.useState(3)

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)

  if (loading)
    return (
      <Center minH="100vh">
        <Spinner />
      </Center>
    )
  if (!me?.name)
    return (
      <Center minH="100vh">
        <NoData>User not found</NoData>
      </Center>
    )
  return (
    <Box minH="100vh">
      <Head>
        <title>Onboarding</title>
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
        {step === 3 ? (
          <IconButton
            icon={<Box as={CgClose} boxSize="20px" />}
            aria-label="close"
            variant="ghost"
            onClick={logout}
          />
        ) : (
          <NextLink href="/home">
            <IconButton icon={<Box as={CgClose} boxSize="20px" />} aria-label="close" variant="ghost" />
          </NextLink>
        )}
        <Text fontWeight="bold" fontSize="xl">
          Step {step} of 5
        </Text>
      </HStack>
      <Box px={6} pt={12}>
        {step === 3 ? (
          <OnboardingStep1 name={me.name} handle={me.handle} setStep={setStep} />
        ) : step === 4 ? (
          <OnboardingStep2 setStep={setStep} />
        ) : (
          <OnboardingStep3 />
        )}
      </Box>
    </Box>
  )
}

export default withAuth(Onboarding)
