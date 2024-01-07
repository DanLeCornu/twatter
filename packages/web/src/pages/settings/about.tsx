import * as React from "react"
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
import { ArrowLeft, ExternalLink } from "lucide-react"
import Head from "next/head"
import NextLink from "next/link"
import router from "next/router"

import { useMe } from "lib/hooks/useMe"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { withAuth } from "components/hoc/withAuth"
import { HEADING_CONTAINER_HEIGHT, HomeLayout } from "components/HomeLayout"

function SettingsAbout() {
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
          <Heading fontSize="md">Additional resources</Heading>
          <Text color="gray.400" fontSize="xs">
            @{me?.handle}
          </Text>
        </Stack>
      </HStack>
      <Stack mt={HEADING_CONTAINER_HEIGHT + "px"} py={2} px={4} spacing={4}>
        <Text color="gray.400" fontSize="xs">
          Check out other places for helpful information to learn more about Twatter
        </Text>
        <Heading fontSize="lg">Legal</Heading>
        {/* TODO: links */}
        <NextLink href="https://e3.365dm.com/18/09/2048x1152/skynews-elon-musk-weed_4414031.jpg?20180907122237">
          <HStack justify="space-between">
            <Text fontSize="sm">Cookie Policy</Text>
            <Icon color="gray.400" as={ExternalLink} />
          </HStack>
        </NextLink>
        <NextLink href="https://e3.365dm.com/18/09/2048x1152/skynews-elon-musk-weed_4414031.jpg?20180907122237">
          <HStack justify="space-between">
            <Text fontSize="sm">Privacy Policy</Text>
            <Icon color="gray.400" as={ExternalLink} />
          </HStack>
        </NextLink>
        <NextLink href="https://e3.365dm.com/18/09/2048x1152/skynews-elon-musk-weed_4414031.jpg?20180907122237">
          <HStack justify="space-between">
            <Text fontSize="sm">Terms of Service</Text>
            <Icon color="gray.400" as={ExternalLink} />
          </HStack>
        </NextLink>

        <Divider />

        <Heading fontSize="lg">Miscellaneous</Heading>

        <NextLink href="https://e3.365dm.com/18/09/2048x1152/skynews-elon-musk-weed_4414031.jpg?20180907122237">
          <HStack justify="space-between">
            <Text fontSize="sm">About</Text>
            <Icon color="gray.400" as={ExternalLink} />
          </HStack>
        </NextLink>
      </Stack>
    </Box>
  )
}

SettingsAbout.getLayout = (page: React.ReactNode) => <HomeLayout showCreateButton={false}>{page}</HomeLayout>

export default withAuth(SettingsAbout)
