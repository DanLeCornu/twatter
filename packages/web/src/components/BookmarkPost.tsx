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
  onClick?: () => void
  children: (hasBookmarked: boolean) => JSX.Element
}

export function BookmarkPost({ postId, onClick, children }: Props) {
  const handler = useMutationHandler()

  // NOTE: using no-cache fetch policy prevents the bookmarks list from re-rendering when opening the share menu drawer
  // on mobile, everything still seems to work but I'm not sure what the full consequences are, keep an eye out for any
  // undesired behaviour
  const { data } = useGetMyBookmarkIdsQuery({ fetchPolicy: "no-cache" })

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
      return handler(() => unbookmarkPost({ variables: { postId } }), {
        onSuccess: (_, toast) => {
          onClick && onClick()
          toast({ description: "Removed from your Bookmarks" })
        },
      })
    } else {
      return handler(() => bookmarkPost({ variables: { postId } }), {
        onSuccess: (_, toast) => {
          onClick && onClick()
          toast({ description: "Added to your Bookmarks", link: "/bookmarks", linkText: "View" })
        },
      })
    }
  }

  return <Box onClick={handleClick}>{React.cloneElement(children(hasBookmarked))}</Box>
}
