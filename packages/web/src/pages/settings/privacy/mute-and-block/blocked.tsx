import * as React from "react"
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { ArrowLeft } from "lucide-react"
import Head from "next/head"
import NextLink from "next/link"
import router from "next/router"

import type { BlockedMutedAccountFragment } from "lib/graphql"
import { useBlockUserMutation, useUnblockUserMutation } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { withAuth } from "components/hoc/withAuth"
import { HEADING_CONTAINER_HEIGHT, HomeLayout } from "components/HomeLayout"

function PrivacyBlockedSettings() {
  const { me, loading } = useMe()

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)

  const blockedAccounts = me?.blockedAccounts || []

  const isBlocked = (userId: string) => {
    return blockedAccounts.map((blockedAccount) => blockedAccount.id).includes(userId) || false
  }

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
          <Heading fontSize="md">Blocked accounts</Heading>
          <Text color="gray.400" fontSize="xs">
            @{me?.handle}
          </Text>
        </Stack>
      </HStack>
      <Stack mt={HEADING_CONTAINER_HEIGHT + "px"} py={2} spacing={4} w="100%">
        <Text color="gray.400" fontSize="xs" px={4}>
          When you block someone, that person won't be able to follow or message you, and you won't receive
          notifications from them
        </Text>
        <Divider />
        <Stack px={4} w="100%">
          {blockedAccounts.length > 0 ? (
            blockedAccounts.map((user, i) => <BlockedAccountItem key={i} user={user} isBlocked={isBlocked} />)
          ) : (
            <Stack p={4}>
              <Heading>Block unwanted accounts</Heading>
              <Text color="gray.400" fontSize="sm">
                When you block someone, they won't be able to follow or message you, and you won't receive
                notifications from them
              </Text>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}

PrivacyBlockedSettings.getLayout = (page: React.ReactNode) => (
  <HomeLayout showCreateButton={false}>{page}</HomeLayout>
)

interface Props {
  user: BlockedMutedAccountFragment
  isBlocked: (userId: string) => boolean
}

export default withAuth(PrivacyBlockedSettings)

function BlockedAccountItem({ user, isBlocked }: Props) {
  const handler = useMutationHandler()

  const [blockState, setBlockState] = React.useState<"blocked" | "unblocked">(
    isBlocked(user.id) ? "blocked" : "unblocked",
  )
  const [block] = useBlockUserMutation()
  const [unblock] = useUnblockUserMutation()

  const handleToggleBlock = async (userId: string) => {
    if (blockState === "blocked") {
      await handler(() => unblock({ variables: { userId } }))
    } else {
      await handler(() => block({ variables: { userId } }))
    }
    return
  }
  return (
    <NextLink href={`/${user.handle}`}>
      <HStack justify="space-between">
        <Box w="70%">
          <HStack>
            <Avatar src={user.avatar || undefined} boxSize="40px" />
            <Stack spacing={0}>
              <Text fontWeight="bold" fontSize="sm" isTruncated w="60%">
                {user.name}
              </Text>
              <Text color="gray.400" fontSize="xs">
                @{user.handle}
              </Text>
            </Stack>
          </HStack>
        </Box>
        {blockState === "blocked" ? (
          <Button
            bg="red.500"
            _hover={{ bg: "red.500" }}
            size="sm"
            onClick={async (e) => {
              e.preventDefault()
              await handleToggleBlock(user.id)
              setBlockState("unblocked")
            }}
          >
            Blocked
          </Button>
        ) : (
          <Button
            variant="outline"
            borderColor="red.500"
            color="red.500"
            size="sm"
            onClick={async (e) => {
              e.preventDefault()
              await handleToggleBlock(user.id)
              setBlockState("blocked")
            }}
          >
            Block
          </Button>
        )}
      </HStack>
    </NextLink>
  )
}
