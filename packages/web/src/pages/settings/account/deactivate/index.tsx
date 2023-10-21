import { BiArrowBack } from "react-icons/bi"
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  IconButton,
  Link,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import Head from "next/head"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { useMe } from "lib/hooks/useMe"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { withAuth } from "components/hoc/withAuth"
import { HEADING_CONTAINER_HEIGHT, HomeLayout } from "components/HomeLayout"

function AccountDeactivateSettings() {
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
          icon={<Box as={BiArrowBack} boxSize="20px" />}
          variant="ghost"
          onClick={() => router.back()}
        />

        <Stack spacing={0}>
          <Heading fontSize="md">Deactivate account</Heading>
          <Text color="gray.400" fontSize="xs">
            @{me.handle}
          </Text>
        </Stack>
      </HStack>
      <Stack mt={HEADING_CONTAINER_HEIGHT + "px"} py={2} px={4} spacing={6}>
        <HStack>
          <Avatar src={me.avatar || undefined} boxSize="40px" />
          <Stack spacing={0}>
            <Text fontWeight="bold" fontSize="sm">
              {me.name}
            </Text>
            <Text color="gray.400" fontSize="sm">
              @{me.handle}
            </Text>
          </Stack>
        </HStack>
        <Heading fontSize="lg">This will deactivate your account</Heading>
        <Text color="gray.400" fontSize="xs">
          You're about to start the process of deactivating your Twatter account. Your display name,
          @username, and public profile will no longer be viewable on twatter.app
        </Text>
        <Heading fontSize="lg">What else you should know</Heading>
        <Text color="gray.400" fontSize="xs">
          If you just want to change your @username, you don't need to deactivate your account - edit it in
          your{" "}
          <NextLink href="/settings/account/data/username">
            <Link>settings</Link>
          </NextLink>
        </Text>
        <Divider />
        <NextLink href="/settings/account/deactivate/confirm">
          <Button variant="link" color="red.500" size="sm" w="100%">
            Deactivate
          </Button>
        </NextLink>
      </Stack>
    </Box>
  )
}

AccountDeactivateSettings.getLayout = (page: React.ReactNode) => (
  <HomeLayout showCreateButton={false}>{page}</HomeLayout>
)

export default withAuth(AccountDeactivateSettings)
