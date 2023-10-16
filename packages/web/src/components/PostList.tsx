import * as React from "react"
import { gql } from "@apollo/client"
import { Box } from "@chakra-ui/react"

import type { PostItemFragment } from "lib/graphql"

import { MOBILE_BOTTOM_TAB_HEIGHT } from "./MobileBottomTabs"
import { PostItem } from "./PostItem"

export const _ = gql`
  fragment UserDetail on User {
    id
    name
    handle
    avatar
    bio
    followerCount
    followingCount
    pinnedPostId
  }
  fragment PostItem on Post {
    id
    text
    image
    createdAt
    replyCount
    likeCount
    viewCount
    user {
      ...UserDetail
    }
  }
  query GetPosts($orderBy: [PostOrderByWithRelationInput!], $where: PostWhereInput, $skip: Int) {
    posts(take: 30, orderBy: $orderBy, where: $where, skip: $skip) {
      items {
        ...PostItem
      }
      count
    }
  }
`

interface Props {
  posts: PostItemFragment[]
}

export function PostList(props: Props) {
  const posts = props.posts || []

  return (
    <Box
      pb={MOBILE_BOTTOM_TAB_HEIGHT + 30 + "px"} // enough to clear the mobile bottom bar + the floating post create button
    >
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </Box>
  )
}
