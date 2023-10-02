import * as React from "react"
import { gql } from "@apollo/client"
import { Button } from "@chakra-ui/react"

import { MeDocument, useFollowUserMutation, useUnfollowUserMutation } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"

export const _ = gql`
  mutation FollowUser($userId: String!) {
    followUser(userId: $userId)
  }
  mutation UnfollowUser($userId: String!) {
    unfollowUser(userId: $userId)
  }
`

interface Props {
  userId: string
  defaultShowFollowing?: boolean
}

export function FollowButton({ userId, defaultShowFollowing }: Props) {
  const { me } = useMe()
  const handler = useMutationHandler()
  const [canUnfollow, setCanUnfollow] = React.useState(defaultShowFollowing)
  const hasFollowed = me?.following.map((following) => following.id).includes(userId)

  const [follow, { loading: followLoading }] = useFollowUserMutation({
    refetchQueries: [{ query: MeDocument }],
  })
  const [unfollow, { loading: unfollowLoading }] = useUnfollowUserMutation({
    refetchQueries: [{ query: MeDocument }],
  })

  const handleFollow = () => {
    if (followLoading) return
    return handler(() => follow({ variables: { userId } }), {
      onSuccess: () => {
        setCanUnfollow(true)
      },
    })
  }
  const handleUnfollow = () => {
    if (unfollowLoading) return
    return handler(() => unfollow({ variables: { userId } }), {
      onSuccess: () => {
        setCanUnfollow(false)
      },
    })
  }

  if (!hasFollowed)
    return (
      <Button colorScheme="monochrome" size="sm" onClick={handleFollow}>
        Follow
      </Button>
    )
  if (canUnfollow)
    return (
      <Button
        colorScheme="monochrome"
        variant="outline"
        size="sm"
        onClick={handleUnfollow}
        sx={{
          "::after": {
            content: '"Following"',
          },
          ":hover::after": {
            content: '"Unfollow"',
          },
        }}
        _hover={{ color: "red" }}
      />
    )
  return null
}
