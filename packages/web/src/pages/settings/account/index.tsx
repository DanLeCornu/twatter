import * as React from "react"
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
import { ArrowLeft, ChevronRight, HeartCrack, KeyRound, User } from "lucide-react"
import Head from "next/head"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { useMe } from "lib/hooks/useMe"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { withAuth } from "components/hoc/withAuth"
import { HEADING_CONTAINER_HEIGHT, HomeLayout } from "components/HomeLayout"

const LIST_ITEMS = [
  {
    icon: User,
    title: "Account information",
    subTitle: "See your account information like your phone number and email address",
    path: "/settings/account/data",
  },
  {
    icon: KeyRound,
    title: "Change your password",
    subTitle: "Change your password at any time",
    path: "/settings/account/password",
  },
  {
    icon: HeartCrack,
    title: "Deactivate your account",
    subTitle: "Find out how you can deactivate your account",
    path: "/settings/account/deactivate",
  },
]

function AccountSettings() {
  const { me, loading } = useMe()
  const router = useRouter()

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
          <Heading fontSize="md">Your Account</Heading>
          <Text color="gray.400" fontSize="xs">
            @{me?.handle}
          </Text>
        </Stack>
      </HStack>
      <Stack mt={HEADING_CONTAINER_HEIGHT + "px"} py={2}>
        <Text color="gray.400" fontSize="xs" px={4}>
          See information about your account, or learn about your account deactivation options
        </Text>
        {LIST_ITEMS.map((listItem, i) => (
          <NextLink key={i} href={listItem.path}>
            <HStack justify="space-between" px={4} py={2}>
              <HStack spacing={6}>
                <Icon as={listItem.icon} boxSize="16px" color="gray.400" />
                <Stack spacing={0}>
                  <Text color="gray.200" fontSize="sm">
                    {listItem.title}
                  </Text>
                  <Text color="gray.400" fontSize="xs">
                    {listItem.subTitle}
                  </Text>
                </Stack>
              </HStack>
              <Icon as={ChevronRight} boxSize="24px" color="gray.400" />
            </HStack>
          </NextLink>
        ))}
      </Stack>
    </Box>
  )
}

AccountSettings.getLayout = (page: React.ReactNode) => (
  <HomeLayout showCreateButton={false}>{page}</HomeLayout>
)

export default withAuth(AccountSettings)
