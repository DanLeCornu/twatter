import * as React from "react"
import { BiArrowBack } from "react-icons/bi"
import { Box, Heading, HStack, IconButton, Stack, Text,useColorModeValue } from "@chakra-ui/react"
import { useRouter } from "next/router"

import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"

export function ProfileNotFound() {
  const router = useRouter()
  const handle = router.query.handle as string

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)

  return (
    <>
      <HStack
        w="100%"
        maxW="100vw"
        h="56px"
        position="fixed"
        backdropFilter="blur(10px)"
        bgColor={bgColor}
        zIndex={1}
        spacing={5}
      >
        <IconButton
          aria-label="back"
          icon={<Box as={BiArrowBack} boxSize="20px" />}
          variant="ghost"
          m={2}
          onClick={() => router.back()}
        />
        <Heading as="h1" size="md" noOfLines={1} maxW="80%">
          Profile
        </Heading>
      </HStack>
      <Box position="relative" pt="56px">
        <Box w="100%" h="115px" position="absolute" bg="gray.600" />
        <Stack px={4} pt="78px" pb={6} spacing={5}>
          <Box boxSize="80px" rounded="full" bg="#1E2732" zIndex={1} />
          <Heading as="h2" size="md">
            @{handle}
          </Heading>
        </Stack>
        <Stack px={4} spacing={1} mt={16}>
          <Heading as="h3" size="xl">
            This account doesn't exist
          </Heading>
          <Text color="gray.400">Try searching for another</Text>
        </Stack>
      </Box>
    </>
  )
}
