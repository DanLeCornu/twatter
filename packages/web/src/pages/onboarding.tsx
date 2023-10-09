import * as React from "react"
import { CgClose } from "react-icons/cg"
import { Box, Center, IconButton, Spinner, Stack, Text } from "@chakra-ui/react"
import Head from "next/head"
import NextLink from "next/link"

import { useLogout } from "lib/hooks/useLogout"
import { useMe } from "lib/hooks/useMe"
import { withAuth } from "components/hoc/withAuth"
import { NoData } from "components/NoData"
import { OnboardingStep1 } from "components/OnboardingStep1"
import { OnboardingStep2 } from "components/OnboardingStep2"
import { OnboardingStep3 } from "components/OnboardingStep3"

function Onboarding() {
  const { me, loading } = useMe()
  const logout = useLogout()
  const [step, setStep] = React.useState(3)

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
    <Stack pt={1} px={6}>
      <Head>
        <title>Onboarding</title>
      </Head>
      {step === 3 ? (
        <IconButton
          icon={<Box as={CgClose} boxSize="20px" />}
          aria-label="close"
          colorScheme="monochrome"
          variant="outline"
          border="none"
          position="fixed"
          top={2}
          left={2}
          onClick={logout}
        />
      ) : (
        <NextLink href="/home">
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
      )}
      <Text fontWeight="bold" fontSize="xl" pl={12}>
        Step {step} of 5
      </Text>
      {step === 3 ? (
        <OnboardingStep1 name={me.name} handle={me.handle} setStep={setStep} />
      ) : step === 4 ? (
        <OnboardingStep2 setStep={setStep} />
      ) : (
        <OnboardingStep3 />
      )}
    </Stack>
  )
}

export default withAuth(Onboarding)
