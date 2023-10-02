import * as React from "react"
import { gql } from "@apollo/client"
import { Box, Center, Flex, Spinner, Stack, Text } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"

import { useGetAdminUserQuery } from "lib/graphql"
import { AdminLayout } from "components/AdminLayout"
import { NoData } from "components/NoData"

const _ = gql`
  fragment AdminUserDetail on User {
    id
    email
    createdAt
  }
  query GetAdminUser($where: UserWhereInput) {
    user(where: $where) {
      ...AdminUserDetail
    }
  }
`

export default function Users() {
  const router = useRouter()
  const id = router.query.id as string
  const { data, loading } = useGetAdminUserQuery({
    variables: { where: { id: { equals: id } } },
    skip: !!!id,
  })
  const user = data?.user

  if (loading)
    return (
      <Center h="100%">
        <Spinner />
      </Center>
    )
  if (!user) return <NoData>User not found</NoData>
  return (
    <Box>
      <Head>
        <title>{user.email}</title>
      </Head>
      <Flex justify="space-between">
        <Stack>
          {/* <Heading fontWeight={800}>{user.fullName}</Heading> */}
          <Text>{user.email}</Text>
          {/* <Text>{user.bio}</Text> */}
        </Stack>
        {/* {user.avatar && <Avatar size="xl" src={user.avatar} name={user.fullName} />} */}
      </Flex>
    </Box>
  )
}

Users.getLayout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>
