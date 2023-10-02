import * as React from "react"
import { Center, Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router"

import { useGetProfileFollowQuery } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { FollowerList } from "components/FollowerList"
import { withAuth } from "components/hoc/withAuth"
import { HomeLayout } from "components/HomeLayout"
import { NoData } from "components/NoData"
import { ProfileFollowLayout } from "components/ProfileFollowLayout"

function ProfileFollowing() {
  const { me } = useMe()
  const router = useRouter()
  const handle = router.query.handle as string

  const { data, loading } = useGetProfileFollowQuery({
    variables: { where: { handle: { equals: handle } } },
  })
  const following = data?.user?.following || []

  if (loading)
    return (
      <Center p={4}>
        <Spinner />
      </Center>
    )
  if (!following)
    return (
      <Center p={4}>
        <NoData>Following not found</NoData>
      </Center>
    )
  return following.length > 0 ? (
    <FollowerList followers={following} />
  ) : (
    <Center p={4}>
      <NoData>
        {me?.handle === handle
          ? "You aren't following anyone yet"
          : "This account isn't following anyone yet"}
      </NoData>
    </Center>
  )
}

ProfileFollowing.getLayout = (page: React.ReactNode) => (
  <HomeLayout>
    <ProfileFollowLayout>{page}</ProfileFollowLayout>
  </HomeLayout>
)

export default withAuth(ProfileFollowing)
