import * as React from "react"
import { BiArrowBack, BiChevronRight, BiVolumeMute } from "react-icons/bi"
import { FiExternalLink, FiMail } from "react-icons/fi"
import {
  Box,
  Center,
  Divider,
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

const LIST_ITEMS = [
  {
    icon: BiVolumeMute,
    title: "Mute and block",
    subTitle: "Manage the accounts that you've muted or blocked",
    path: "/settings/privacy/mute-and-block",
  },
  {
    icon: FiMail,
    title: "Direct Messages",
    subTitle: "Manage who can message your directly",
    path: "/settings/privacy/messages",
  },
]

function PrivacySettings() {
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
          icon={<Box as={BiArrowBack} boxSize="20px" />}
          variant="ghost"
          onClick={() => router.back()}
        />

        <Stack spacing={0}>
          <Heading fontSize="md">Privacy and safety</Heading>
          <Text color="gray.400" fontSize="xs">
            @{me?.handle}
          </Text>
        </Stack>
      </HStack>
      <Stack mt={HEADING_CONTAINER_HEIGHT + "px"} py={2} spacing={5}>
        <Text color="gray.400" fontSize="xs" px={4}>
          Manage what information you see and share on Twatter
        </Text>
        <Heading fontSize="lg" px={4}>
          Your Twatter activity
        </Heading>
        <Stack px={4}>
          {LIST_ITEMS.map((listItem, i) => (
            <NextLink key={i} href={listItem.path}>
              <HStack justify="space-between" pl={2} py={2}>
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
                <Icon as={BiChevronRight} boxSize="24px" color="gray.400" />
              </HStack>
            </NextLink>
          ))}
        </Stack>
        <Divider />
        <Stack px={4}>
          <Heading fontSize="lg">Learn more about privacy on Twatter</Heading>
          <Stack spacing={4} mt={4}>
            {/* TODO: links */}
            <NextLink href="">
              <HStack justify="space-between">
                <Text fontSize="sm">Privacy Policy</Text>
                <Icon color="gray.400" as={FiExternalLink} />
              </HStack>
            </NextLink>
            <NextLink href="">
              <HStack justify="space-between">
                <Text fontSize="sm">Contact us</Text>
                <Icon color="gray.400" as={FiExternalLink} />
              </HStack>
            </NextLink>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

PrivacySettings.getLayout = (page: React.ReactNode) => (
  <HomeLayout showCreateButton={false}>{page}</HomeLayout>
)

export default withAuth(PrivacySettings)
