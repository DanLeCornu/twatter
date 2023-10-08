import * as React from "react"
import { gql } from "@apollo/client"
import type { BoxProps } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"

import {
  GetMyBookmarksDocument,
  GetPostDocument,
  MeDocument,
  useBookmarkPostMutation,
  useGetMyBookmarkIdsQuery,
  useUnbookmarkPostMutation,
} from "lib/graphql"
import { useMutationHandler } from "lib/hooks/useMutationHandler"

export const _ = gql`
  mutation BookmarkPost($postId: String!) {
    createBookmark(postId: $postId)
  }
  mutation UnbookmarkPost($postId: String!) {
    destroyBookmark(postId: $postId)
  }
  query GetMyBookmarkIds {
    me {
      id
      bookmarks {
        postId
      }
    }
  }
`

interface Props extends Omit<BoxProps, "children"> {
  postId: string
  children: (hasBookmarked: boolean) => JSX.Element
}

export function BookmarkPost({ postId, children }: Props) {
  const handler = useMutationHandler()

  const { data } = useGetMyBookmarkIdsQuery()

  const hasBookmarked = data?.me?.bookmarks?.map((bookmark) => bookmark.postId).includes(postId) || false

  const [bookmarkPost] = useBookmarkPostMutation({
    refetchQueries: [
      { query: GetPostDocument, variables: { where: { id: { equals: postId } } } },
      { query: MeDocument },
      { query: GetMyBookmarksDocument },
    ],
  })
  const [unbookmarkPost] = useUnbookmarkPostMutation({
    refetchQueries: [
      { query: GetPostDocument, variables: { where: { id: { equals: postId } } } },
      { query: MeDocument },
      { query: GetMyBookmarksDocument },
    ],
  })

  const handleClick = () => {
    if (hasBookmarked) {
      return handler(() => unbookmarkPost({ variables: { postId } }))
    } else {
      return handler(() => bookmarkPost({ variables: { postId } }))
    }
  }

  return <Box onClick={handleClick}>{React.cloneElement(children(hasBookmarked))}</Box>
}
