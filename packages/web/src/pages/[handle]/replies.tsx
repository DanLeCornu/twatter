import * as React from "react"
import { Center, Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router"

import { SortOrder, useGetPostsQuery } from "lib/graphql"
import { withAuth } from "components/hoc/withAuth"
import { HomeLayout } from "components/HomeLayout"
import { NoData } from "components/NoData"
import { PostList } from "components/PostList"
import { ProfileLayout } from "components/ProfileLayout"

function ProfileReplies() {
  const router = useRouter()
  const handle = router.query.handle as string

  const { data, loading } = useGetPostsQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: { createdAt: SortOrder.Desc },
      where: {
        replies: { some: {} },
        user: { is: { handle: { equals: handle } } },
      },
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
  return posts.length > 0 ? (
    <PostList posts={posts} />
  ) : (
    <Center p={4}>
      <NoData>No posts with replies</NoData>
    </Center>
  )
}

ProfileReplies.getLayout = (page: React.ReactNode) => (
  <HomeLayout>
    <ProfileLayout>{page}</ProfileLayout>
  </HomeLayout>
)

export default withAuth(ProfileReplies)
