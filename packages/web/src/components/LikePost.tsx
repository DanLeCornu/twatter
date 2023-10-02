import * as React from "react"
import { AiOutlineHeart } from "react-icons/ai"
import { gql } from "@apollo/client"
import { Box, Button } from "@chakra-ui/react"

import {
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
      leftIcon={<Box as={AiOutlineHeart} boxSize={size === "large" ? "25px" : undefined} />}
      onClick={handleClick}
    >
      {likeCount > 0 && likeCount.toLocaleString()}
    </Button>
  )
}
