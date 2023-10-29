import * as React from "react"
import { BiArrowBack } from "react-icons/bi"
import { gql } from "@apollo/client"
import {
  Box,
  Button,
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
  useDisclosure,
} from "@chakra-ui/react"
import Head from "next/head"
import NextLink from "next/link"
import { useRouter } from "next/router"

import type { ReportType } from "lib/graphql"
import { useGetMessageQuery } from "lib/graphql"
import { MeDocument, useCreateReportMutation } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"
import { REPORT_MESSAGE_TYPES } from "lib/static/reportIssueTypes"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { withAuth } from "components/hoc/withAuth"
import { HEADING_CONTAINER_HEIGHT } from "components/HomeLayout"
import { Modal } from "components/Modal"
import { NoData } from "components/NoData"

const _ = gql`
  fragment MessageReport on Message {
    id
    text
  }
  query GetMessage($messageId: String!) {
    message(messageId: $messageId) {
      ...MessageReport
    }
  }
`

function ReportMessage() {
  const { me } = useMe()
  const router = useRouter()
  const modalProps = useDisclosure()
  const handler = useMutationHandler()

  router.isReady

  const [type, setType] = React.useState<ReportType>()

  const messageId = router.query.id as string

  const [submit, { loading: submitLoading }] = useCreateReportMutation({
    refetchQueries: [{ query: MeDocument }],
  })

  const { data, loading } = useGetMessageQuery({ variables: { messageId } })
  const message = data?.message

  const handleSubmit = () => {
    if (!type || submitLoading) return
    return handler(() => submit({ variables: { data: { type, messageId } } }), {
      onSuccess: (_, toast) => {
        router.replace("/messages")
        toast({ description: "Your Report has been submitted" })
      },
    })
  }

  const hasReported = me?.createdReports.map((report) => report.messageId).includes(messageId) || false
  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)

  if (loading && !message)
    return (
      <Center minH="80vh">
        <Spinner />
      </Center>
    )
  if (!message)
    return (
      <Center minH="80vh">
        <Stack align="center">
          <NoData>Message not found</NoData>
          <Box fontSize="sm" textAlign="center" px={7}>
            <Stack>
              <Text>This message may have been deleted</Text>
              <NextLink href="/messages">
                <Text textDecor="underline">Back to your messages</Text>
              </NextLink>
            </Stack>
          </Box>
        </Stack>
      </Center>
    )
  if (!submitLoading && router.isReady && hasReported)
    return (
      <Center minH="80vh">
        <Stack align="center">
          <NoData>Message already reported</NoData>
          <Box fontSize="sm" textAlign="center" px={7}>
            <Stack>
              <Text>You've already reported this message</Text>
              <NextLink href="/messages">
                <Text textDecor="underline">Back to your messages</Text>
              </NextLink>
            </Stack>
          </Box>
        </Stack>
      </Center>
    )
  return (
    <Box>
      <Head>
        <title>Messages / Twatter</title>
      </Head>
      <Box
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
        <Box
          position="fixed"
          top={0}
          left={0}
          h={HEADING_CONTAINER_HEIGHT}
          zIndex={1}
          pt={2}
          pl={2}
          pr={3}
          w="100%"
        >
          <HStack justify="space-between" w="100%" align="baseline">
            <HStack position="relative" spacing={3} w="calc(100% - 28px)">
              <IconButton
                aria-label="back"
                icon={<Box as={BiArrowBack} boxSize="20px" />}
                variant="ghost"
                onClick={() => router.back()}
              />
              <Heading fontSize="md" isTruncated>
                Report an issue
              </Heading>
            </HStack>
          </HStack>
        </Box>
      </Box>

      <Stack mt={HEADING_CONTAINER_HEIGHT + "px"} py={2} px={4} spacing={4}>
        <Text fontSize="lg" color="gray.400">
          Help us understand the issue. What's the problem with this message?
        </Text>
        <Text fontStyle="italic" color="gray.500" fontSize="sm" m={4} noOfLines={3}>
          {message.text}
        </Text>
        <RadioGroup onChange={(e) => setType(e as ReportType)}>
          <Stack spacing={4}>
            {REPORT_MESSAGE_TYPES.map(({ value, title }) => (
              <HStack key={value} align="flex-start" justify="space-between">
                <FormLabel htmlFor={value} cursor="pointer" w="100%">
                  <Stack spacing={0}>
                    <Text fontWeight="bold">{title}</Text>
                  </Stack>
                </FormLabel>
                <Radio id={value} value={value} />
              </HStack>
            ))}
          </Stack>
        </RadioGroup>
      </Stack>
      <Box position="fixed" bottom={0} left={0} w="100%" p={4}>
        <Button w="100%" size="lg" isDisabled={!!!type} onClick={modalProps.onOpen}>
          Report message
        </Button>
      </Box>

      {/* CONFIRMATION MODAL */}
      <Modal {...modalProps} title="Report message?">
        <Text mb={6}>
          You are about to report this message for <b>{type?.toString().toLowerCase()}</b>
        </Text>
        <Stack>
          <Button onClick={handleSubmit} isLoading={submitLoading}>
            Yes, submit report
          </Button>
          <Button colorScheme="monochrome" onClick={modalProps.onClose}>
            Cancel
          </Button>
        </Stack>
      </Modal>
    </Box>
  )
}

export default withAuth(ReportMessage)
