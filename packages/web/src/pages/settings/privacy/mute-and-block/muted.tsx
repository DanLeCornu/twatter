import * as React from "react"
import {
  Avatar,
  Box,
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
import { ArrowLeft, Volume2, VolumeX } from "lucide-react"
import Head from "next/head"
import NextLink from "next/link"
import router from "next/router"

import type { BlockedMutedAccountFragment } from "lib/graphql"
import { useMuteUserMutation, useUnmuteUserMutation } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { withAuth } from "components/hoc/withAuth"
import { HEADING_CONTAINER_HEIGHT, HomeLayout } from "components/HomeLayout"

function PrivacyMutedSettings() {
  const { me, loading } = useMe()

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)

  const mutedAccounts = me?.mutedAccounts || []

  const isMuted = (userId: string) => {
    return mutedAccounts.map((mutedAccount) => mutedAccount.id).includes(userId) || false
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
          <Heading fontSize="md">Muted accounts</Heading>
          <Text color="gray.400" fontSize="xs">
            @{me?.handle}
          </Text>
        </Stack>
      </HStack>
      <Stack mt={HEADING_CONTAINER_HEIGHT + "px"} py={2} spacing={4} w="100%">
        <Text color="gray.400" fontSize="xs" px={4}>
          Here's everyone you muted. You can add or remove them from this list
        </Text>
        <Divider />
        <Stack px={4} w="100%">
          {mutedAccounts.length > 0 ? (
            mutedAccounts.map((user, i) => <MutedAccountItem key={i} user={user} isMuted={isMuted} />)
          ) : (
            <Stack p={4}>
              <Heading>Muted accounts</Heading>
              <Text color="gray.400" fontSize="sm">
                Posts from muted accounts won't show up in you Home timeline. Mute accounts directly from
                their profile or post
              </Text>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}

PrivacyMutedSettings.getLayout = (page: React.ReactNode) => (
  <HomeLayout showCreateButton={false}>{page}</HomeLayout>
)

interface Props {
  user: BlockedMutedAccountFragment
  isMuted: (userId: string) => boolean
}

export default withAuth(PrivacyMutedSettings)

function MutedAccountItem({ user, isMuted }: Props) {
  const handler = useMutationHandler()

  const [muteState, setMuteState] = React.useState<"muted" | "unmuted">(
    isMuted(user.id) ? "muted" : "unmuted",
  )
  const [mute] = useMuteUserMutation()
  const [unmute] = useUnmuteUserMutation()

  const handleToggleMute = async (userId: string) => {
    if (muteState === "muted") {
      await handler(() => unmute({ variables: { userId } }), {
        onSuccess: (_, toast) => {
          toast({ description: `@${user.handle} has been unmuted` })
        },
      })
    } else {
      await handler(() => mute({ variables: { userId } }), {
        onSuccess: (_, toast) => {
          toast({ description: `@${user.handle} has been muted` })
        },
      })
    }
    return
  }
  return (
    <NextLink href={`/${user.handle}`}>
      <HStack justify="space-between">
        <Box w="85%">
          <HStack>
            <Avatar src={user.avatar || undefined} boxSize="40px" />
            <Stack spacing={0}>
              <Text fontWeight="bold" fontSize="sm" isTruncated w="85%">
                {user.name}
              </Text>
              <Text color="gray.400" fontSize="xs">
                @{user.handle}
              </Text>
            </Stack>
          </HStack>
        </Box>
        {muteState === "muted" ? (
          <IconButton
            aria-label={`Unmute ${user.handle}`}
            icon={<Box as={VolumeX} boxSize="18px" />}
            variant="outline"
            borderColor="red.500"
            color="red.500"
            size="sm"
            onClick={async (e) => {
              e.preventDefault()
              await handleToggleMute(user.id)
              setMuteState("unmuted")
            }}
          />
        ) : (
          <IconButton
            aria-label={`Mute ${user.handle}`}
            icon={<Box as={Volume2} boxSize="18px" />}
            variant="outline"
            size="sm"
            onClick={async (e) => {
              e.preventDefault()
              await handleToggleMute(user.id)
              setMuteState("muted")
            }}
          />
        )}
      </HStack>
    </NextLink>
  )
}
