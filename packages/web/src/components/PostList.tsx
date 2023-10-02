import * as React from "react"
import { gql } from "@apollo/client"

import type { PostItemFragment } from "lib/graphql"

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
    <>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </>
  )
}
