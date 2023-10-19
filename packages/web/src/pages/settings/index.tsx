import * as React from "react"
import { BiArrowBack, BiChevronRight } from "react-icons/bi"
import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import Head from "next/head"
import NextLink from "next/link"
import router from "next/router"

import { useMe } from "lib/hooks/useMe"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { withAuth } from "components/hoc/withAuth"
import { HEADING_CONTAINER_HEIGHT, HomeLayout } from "components/HomeLayout"

// const _ = gql`
//   mutation DestroyAccount {
//     destroyAccount
//   }
// `

function Settings() {
  const { me, loading } = useMe()

  // const [destroy, { loading: destroyLoading }] = useDestroyAccountMutation()

  // const handleDestroy = () => {
  //   return handler(destroy, { onSuccess: () => logout() })
  // }

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)
  const borderColor = useColorModeValue("gray.100", "gray.700")

  const SETTINGS = [
    { text: "Your account", path: "/settings/account" },
    { text: "Privacy and safety", path: "/settings/privacy" },
    { text: "Additional resources", path: "/settings/about" },
  ]

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
        borderBottom="1px"
        borderColor={borderColor}
      >
        <IconButton
          aria-label="back"
          icon={<Box as={BiArrowBack} boxSize="20px" />}
          variant="ghost"
          onClick={() => router.back()}
        />

        <Stack spacing={0}>
          <Heading fontSize="lg">Settings</Heading>
          <Text color="gray.400" fontSize="xs">
            @{me?.handle}
          </Text>
        </Stack>
      </HStack>
      <Stack mt={HEADING_CONTAINER_HEIGHT + "px"} py={2}>
        {SETTINGS.map((setting, i) => (
          <NextLink key={i} href={setting.path}>
            <HStack justify="space-between" px={4} py={2}>
              <Text color="gray.300" fontSize="sm">
                {setting.text}
              </Text>
              <Icon as={BiChevronRight} boxSize="24px" color="gray.400" />
            </HStack>
          </NextLink>
        ))}
      </Stack>
    </Box>
  )
}

Settings.getLayout = (page: React.ReactNode) => <HomeLayout showCreateButton={false}>{page}</HomeLayout>

export default withAuth(Settings)
