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
import { ChevronRight } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import Head from "next/head"
import NextLink from "next/link"
import router from "next/router"

import { useMe } from "lib/hooks/useMe"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { withAuth } from "components/hoc/withAuth"
import { HEADING_CONTAINER_HEIGHT, HomeLayout } from "components/HomeLayout"

const LIST_ITEMS = [
  { text: "Blocked accounts", path: "/settings/privacy/mute-and-block/blocked" },
  { text: "Muted accounts", path: "/settings/privacy/mute-and-block/muted" },
]

function PrivacyMuteBlockSettings() {
  const { me, loading } = useMe()

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
          <Heading fontSize="md">Mute and block</Heading>
          <Text color="gray.400" fontSize="xs">
            @{me?.handle}
          </Text>
        </Stack>
      </HStack>
      <Stack mt={HEADING_CONTAINER_HEIGHT + "px"} py={2} px={4} spacing={4}>
        <Text color="gray.400" fontSize="xs">
          Manage the accounts that you've muted or blocked
        </Text>
        <Stack>
          {LIST_ITEMS.map((listItem, i) => (
            <NextLink key={i} href={listItem.path}>
              <HStack justify="space-between" py={2}>
                <Text color="gray.300" fontSize="sm">
                  {listItem.text}
                </Text>
                <Icon as={ChevronRight} boxSize="24px" color="gray.400" />
              </HStack>
            </NextLink>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}

PrivacyMuteBlockSettings.getLayout = (page: React.ReactNode) => (
  <HomeLayout showCreateButton={false}>{page}</HomeLayout>
)

export default withAuth(PrivacyMuteBlockSettings)
