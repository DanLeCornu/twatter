import * as React from "react"
import { CgClose } from "react-icons/cg"
import { Box, Center,IconButton, Stack, Text } from "@chakra-ui/react"
import Head from "next/head"

import { useLogout } from "lib/hooks/useLogout"
import { useMe } from "lib/hooks/useMe"
import { withAuth } from "components/hoc/withAuth"
import { NoData } from "components/NoData"
import { OnboardingStep1 } from "components/OnboardingStep1"
import { OnboardingStep2 } from "components/OnboardingStep2"

function Onboarding() {
  const { me } = useMe()
  const logout = useLogout()
  const [step, setStep] = React.useState(3)

  if (!me?.name)
    return (
      <Center minH="80vh">
        <NoData>User not found</NoData>
      </Center>
    )

  return (
    <Stack pt={1} px={6}>
      <Head>
        <title>Onboarding</title>
      </Head>
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
      <Text fontWeight="bold" fontSize="xl" pl={12}>
        Step {step} of 4
      </Text>
      {step === 3 ? <OnboardingStep1 name={me.name} setStep={setStep} /> : <OnboardingStep2 />}
    </Stack>
  )
}

export default withAuth(Onboarding)
