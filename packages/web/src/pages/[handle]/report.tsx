import * as React from "react"
import { gql } from "@apollo/client"
import { Box, Center, Spinner, Stack, Text } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import type { ReportType } from "lib/graphql"
import { MeDocument, useCreateReportMutation, useGetUserQuery } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"
import { withAuth } from "components/hoc/withAuth"
import { NoData } from "components/NoData"
import { ReportFlow } from "components/ReportFlow"

const _ = gql`
  fragment UserReport on User {
    id
  }
  query GetUser($where: UserWhereInput!) {
    user(where: $where) {
      ...UserReport
    }
  }
`

function ReportUser() {
  const { me } = useMe()
  const router = useRouter()
  const handler = useMutationHandler()

  const [type, setType] = React.useState<ReportType>()

  const handle = router.query.handle as string

  const [submit, { loading: submitLoading }] = useCreateReportMutation({
    refetchQueries: [{ query: MeDocument }],
  })

  const { data, loading } = useGetUserQuery({
    fetchPolicy: "cache-and-network",
    variables: { where: { handle: { equals: handle } } },
    skip: !!!handle,
  })
  const user = data?.user

  const handleSubmit = () => {
    if (!user || !type || submitLoading) return
    return handler(() => submit({ variables: { data: { type, userId: user.id } } }), {
      onSuccess: (_, toast) => {
        toast({ description: "Your Report has been submitted" })
        router.replace("/home")
      },
    })
  }

  const hasReported = (user && me?.createdReports.map((report) => report.userId).includes(user.id)) || false

  if (loading && !user)
    return (
      <Center minH="80vh">
        <Spinner />
      </Center>
    )
  if (!user)
    return (
      <Center minH="80vh">
        <Stack align="center">
          <NoData>Account not found</NoData>
          <Box fontSize="sm" textAlign="center" px={7}>
            <Stack>
              <Text>This account may be deleted or suspended</Text>
              <NextLink href="/home">
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
          <NoData>Account already reported</NoData>
          <Box fontSize="sm" textAlign="center" px={7}>
            <Stack>
              <Text>You've already reported this account</Text>
              <NextLink href="/home">
                <Text textDecor="underline">Back to Twatter</Text>
              </NextLink>
            </Stack>
          </Box>
        </Stack>
      </Center>
    )
  return <ReportFlow type={type} setType={setType} handleSubmit={handleSubmit} />
}

export default withAuth(ReportUser)
