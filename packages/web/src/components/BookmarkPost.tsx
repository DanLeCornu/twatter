import * as React from "react"
import { gql } from "@apollo/client"
import type { BoxProps } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"

import { GetPostDocument, MeDocument, useBookmarkPostMutation, useUnbookmarkPostMutation } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"

export const _ = gql`
  mutation BookmarkPost($postId: String!) {
    createBookmark(postId: $postId)
  }
  mutation UnbookmarkPost($postId: String!) {
    destroyBookmark(postId: $postId)
  }
`

interface Props extends Omit<BoxProps, "children"> {
  postId: string
  children: (hasBookmarked: boolean) => JSX.Element
}

export function BookmarkPost({ postId, children }: Props) {
  const { me } = useMe()
  const handler = useMutationHandler()

  const hasBookmarked = me?.bookmarks?.map((bookmark) => bookmark.postId).includes(postId) || false

  const [bookmarkPost] = useBookmarkPostMutation({
    refetchQueries: [
      { query: GetPostDocument, variables: { where: { id: { equals: postId } } } },
      { query: MeDocument },
    ],
  })
  const [unbookmarkPost] = useUnbookmarkPostMutation({
    refetchQueries: [
      { query: GetPostDocument, variables: { where: { id: { equals: postId } } } },
      { query: MeDocument },
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
