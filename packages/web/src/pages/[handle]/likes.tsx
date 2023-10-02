import * as React from "react"
import { Center, Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router"

import { SortOrder, useGetPostsQuery } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { withAuth } from "components/hoc/withAuth"
import { HomeLayout } from "components/HomeLayout"
import { NoData } from "components/NoData"
import { PostList } from "components/PostList"
import { ProfileLayout } from "components/ProfileLayout"

function ProfileLikes() {
  const { me } = useMe()
  const router = useRouter()
  const handle = router.query.handle as string

  const { data, loading } = useGetPostsQuery({
    variables: {
      orderBy: { createdAt: SortOrder.Desc },
      where: {
        likes: { some: { user: { is: { handle: { equals: handle } } } } },
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
      <NoData>
        {me?.handle === handle
          ? "You haven't liked any posts yet"
          : "This account hasn't liked any posts yet"}
      </NoData>
    </Center>
  )
}

ProfileLikes.getLayout = (page: React.ReactNode) => (
  <HomeLayout>
    <ProfileLayout>{page}</ProfileLayout>
  </HomeLayout>
)

export default withAuth(ProfileLikes)
