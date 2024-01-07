import * as React from "react"
import { gql } from "@apollo/client"
import { Box, Button } from "@chakra-ui/react"
import { Heart } from "lucide-react"

import {
  GetMyBookmarksDocument,
  GetPostDocument,
  GetPostsDocument,
  MeDocument,
  SortOrder,
  useLikePostMutation,
  useUnlikePostMutation,
} from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"

export const _ = gql`
  mutation LikePost($postId: String!) {
    createLike(postId: $postId)
  }
  mutation UnlikePost($postId: String!) {
    destroyLike(postId: $postId)
  }
`

interface Props {
  postId: string
  likeCount: number
  size?: "small" | "large"
}

export function LikePost({ postId, likeCount, size = "large" }: Props) {
  const { me } = useMe()
  const handler = useMutationHandler()
  const [likePost] = useLikePostMutation({
    refetchQueries: [
      { query: GetPostDocument, variables: { where: { id: { equals: postId } } } },
      {
        query: GetPostsDocument,
        variables: {
          orderBy: { createdAt: SortOrder.Desc },
          where: {
            likes: { some: { user: { is: { handle: { equals: me?.handle } } } } },
          },
        },
      },
      { query: MeDocument },
      { query: GetMyBookmarksDocument },
    ],
  })
  const [unlikePost] = useUnlikePostMutation({
    refetchQueries: [
      { query: GetPostDocument, variables: { where: { id: { equals: postId } } } },
      {
        query: GetPostsDocument,
        variables: {
          orderBy: { createdAt: SortOrder.Desc },
          where: {
            likes: { some: { user: { is: { handle: { equals: me?.handle } } } } },
          },
        },
      },
      { query: MeDocument },
      { query: GetMyBookmarksDocument },
    ],
  })

  const hasLiked = me?.likes?.map((like) => like.postId).includes(postId) || false

  const [active, setActive] = React.useState(hasLiked)

  const handleClick = () => {
    if (hasLiked) {
      return handler(() => unlikePost({ variables: { postId } }), {
        onSuccess: () => setActive(false),
      })
    } else {
      return handler(() => likePost({ variables: { postId } }), {
        onSuccess: () => setActive(true),
      })
    }
  }

  return (
    <Button
      variant="ghost"
      size={size === "small" ? "sm" : undefined}
      color={active ? "red.500" : "gray"}
      _hover={{ color: "red.500" }}
      leftIcon={<Box as={Heart} boxSize={size === "large" ? "25px" : "18px"} />}
      onClick={handleClick}
    >
      {likeCount > 0 && likeCount.toLocaleString()}
    </Button>
  )
}
