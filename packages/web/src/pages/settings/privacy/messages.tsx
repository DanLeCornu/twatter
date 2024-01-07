import * as React from "react"
import {
  Box,
  Center,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { ArrowLeft } from "lucide-react"
import Head from "next/head"
import { useRouter } from "next/router"

import { AllowMessagesFrom, MeDocument, useUpdateProfileMutation } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { withAuth } from "components/hoc/withAuth"
import { HEADING_CONTAINER_HEIGHT, HomeLayout } from "components/HomeLayout"

function PrivacyMessagesSettings() {
  const router = useRouter()
  const handler = useMutationHandler()
  const { me, loading } = useMe()

  const [update] = useUpdateProfileMutation({ refetchQueries: [{ query: MeDocument }] })

  const defaultValue = me?.allowMessagesFrom

  const [value, setValue] = React.useState(defaultValue)

  const handleRadioChange = (value: AllowMessagesFrom) => {
    setValue(value)
    return handler(() => update({ variables: { data: { allowMessagesFrom: value } } }))
  }

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)

  if (loading)
    return (
      <Center>
        <Spinner />
      </Center>
    )
  if (!me) return null
  return (
    <Box>
      <Head>
        <title>Settings / Twatter</title>
      </Head>
      <HStack
        position="fixed"
        top={0}
        left={0}
        w="100%"
        h={HEADING_CONTAINER_HEIGHT + "px"}
        zIndex={1}
        p={2}
        backdropFilter="blur(10px)"
        bgColor={bgColor}
      >
        <IconButton
          aria-label="back"
          icon={<Box as={ArrowLeft} boxSize="20px" />}
          variant="ghost"
          onClick={() => router.back()}
        />

        <Stack spacing={0}>
          <Heading fontSize="md">Direct Messages</Heading>
          <Text color="gray.400" fontSize="xs">
            @{me?.handle}
          </Text>
        </Stack>
      </HStack>
      <Stack mt={HEADING_CONTAINER_HEIGHT + "px"} py={2}>
        <Stack px={4} spacing={4}>
          <Stack spacing={0}>
            <Text fontSize="sm" fontWeight="bold">
              Allow message requests from:
            </Text>
            <Text fontSize="xs" color="gray.400">
              People you follow will always be able to message you
            </Text>
          </Stack>

          <RadioGroup onChange={handleRadioChange} value={value}>
            <Stack spacing={0}>
              <HStack justify="space-between">
                <FormLabel htmlFor="no-one" cursor="pointer">
                  <Text fontSize="sm" color="gray.300">
                    No one
                  </Text>
                </FormLabel>
                <Radio id="no-one" value={AllowMessagesFrom.NoOne} />
              </HStack>
              <HStack justify="space-between">
                <FormLabel htmlFor="everyone" cursor="pointer">
                  <Text fontSize="sm" color="gray.300">
                    Everyone
                  </Text>
                </FormLabel>
                <Radio id="everyone" value={AllowMessagesFrom.Everyone} />
              </HStack>
            </Stack>
          </RadioGroup>
        </Stack>
      </Stack>
    </Box>
  )
}

PrivacyMessagesSettings.getLayout = (page: React.ReactNode) => (
  <HomeLayout showCreateButton={false}>{page}</HomeLayout>
)

export default withAuth(PrivacyMessagesSettings)
