import * as React from "react"
import { Center, Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router"

import { SortOrder, useGetPostsQuery } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { withAuth } from "components/hoc/withAuth"
import { HomeLayout } from "components/HomeLayout"
import { NoData } from "components/NoData"
import { PostItem } from "components/PostItem"
import { PostList } from "components/PostList"
import { ProfileLayout } from "components/ProfileLayout"

function Profile() {
  const { me } = useMe()
  const router = useRouter()
  const handle = router.query.handle as string

  const { data, loading } = useGetPostsQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: { createdAt: SortOrder.Desc },
      where: { user: { is: { handle: { equals: handle } } }, pinnedUser: null },
    },
  })
  const posts = data?.posts.items || []

  if (loading)
    return (
      <Center p={4}>
        <Spinner />
      </Center>
    )
  if (!posts)
    return (
      <Center p={4}>
        <NoData>Posts not found</NoData>
      </Center>
    )
  return posts.length > 0 || me?.pinnedPost ? (
    <>
      {handle === me?.handle && me.pinnedPost && <PostItem post={me.pinnedPost} isPinned />}
      <PostList posts={posts} />
    </>
  ) : (
    <Center p={4}>
      <NoData>
        {me?.handle === handle
          ? "You haven't posted anything yet"
          : "This account hasn't posted anything yet"}
      </NoData>
    </Center>
  )
}

Profile.getLayout = (page: React.ReactNode) => (
  <HomeLayout>
    <ProfileLayout>{page}</ProfileLayout>
  </HomeLayout>
)

export default withAuth(Profile)
