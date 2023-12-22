import * as React from "react"

import type { PostItemFragment } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"

interface Props {
  post: PostItemFragment
}

export function PostAnalytics({ post }: Props) {
  const { me } = useMe()

  if (post.user.id === me?.id) return <p>Currently in development - come back soon!</p>
  else return <p>Times this post was seen.</p>
}
