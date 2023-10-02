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

function ProfileFollowers() {
  const { me } = useMe()
  const router = useRouter()
  const handle = router.query.handle as string

  const { data, loading } = useGetProfileFollowQuery({
    variables: { where: { handle: { equals: handle } } },
  })
  const followers = data?.user?.followers || []

  if (loading)
    return (
      <Center p={4}>
        <Spinner />
      </Center>
    )
  if (!followers)
    return (
      <Center p={4}>
        <NoData>Followers not found</NoData>
      </Center>
    )
  return followers.length > 0 ? (
    <FollowerList followers={followers} />
  ) : (
    <Center p={4}>
      <NoData>
        {me?.handle === handle
          ? "You haven't got any followers yet"
          : "This account hasn't got any followers yet"}
      </NoData>
    </Center>
  )
}

ProfileFollowers.getLayout = (page: React.ReactNode) => (
  <HomeLayout>
    <ProfileFollowLayout>{page}</ProfileFollowLayout>
  </HomeLayout>
)

export default withAuth(ProfileFollowers)
