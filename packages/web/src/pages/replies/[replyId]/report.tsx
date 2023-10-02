import * as React from "react"
import { gql } from "@apollo/client"
import { Box, Center, Spinner, Stack, Text } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import type { ReportType } from "lib/graphql"
import { MeDocument, useCreateReportMutation, useGetReplyQuery } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"
import { withAuth } from "components/hoc/withAuth"
import { NoData } from "components/NoData"
import { ReportFlow } from "components/ReportFlow"

const _ = gql`
  fragment ReplyReport on Reply {
    id
  }
  query GetReply($where: ReplyWhereInput!) {
    reply(where: $where) {
      ...ReplyReport
    }
  }
`

function ReportReply() {
  const { me } = useMe()
  const router = useRouter()

  const handler = useMutationHandler()

  const [type, setType] = React.useState<ReportType>()

  const replyId = router.query.replyId as string

  const [submit, { loading: submitLoading }] = useCreateReportMutation({
    refetchQueries: [{ query: MeDocument }],
  })

  const { data, loading } = useGetReplyQuery({
    fetchPolicy: "cache-and-network",
    variables: { where: { id: { equals: replyId } } },
    skip: !!!replyId,
  })
  const reply = data?.reply

  const handleSubmit = () => {
    if (!type || submitLoading) return
    return handler(() => submit({ variables: { data: { type, replyId: replyId } } }), {
      onSuccess: () => {
        router.replace("/")
      },
    })
  }

  const hasReported = me?.createdReports.map((report) => report.replyId).includes(replyId) || false

  if (loading && !reply)
    return (
      <Center minH="80vh">
        <Spinner />
      </Center>
    )
  if (!reply)
    return (
      <Center minH="80vh">
        <Stack align="center">
          <NoData>Post not found</NoData>
          <Box fontSize="sm" textAlign="center" px={7}>
            <Stack>
              <Text>
                This post may be deleted, or from a blocked or muted account - you can update this in your
                settings
              </Text>
              <NextLink href="/">
                <Text textDecor="underline">Back to Twatter</Text>
              </NextLink>
            </Stack>
          </Box>
        </Stack>
      </Center>
    )
  if (hasReported)
    return (
      <Center minH="80vh">
        <Stack align="center">
          <NoData>Post already reported</NoData>
          <Box fontSize="sm" textAlign="center" px={7}>
            <Stack>
              <Text>You've already reported this post</Text>
              <NextLink href="/">
                <Text textDecor="underline">Back to Twatter</Text>
              </NextLink>
            </Stack>
          </Box>
        </Stack>
      </Center>
    )
  return <ReportFlow type={type} setType={setType} handleSubmit={handleSubmit} />
}

export default withAuth(ReportReply)
