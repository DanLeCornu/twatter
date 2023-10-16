import * as React from "react"

import type { PostItemFragment, ReplyItemFragment } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"

interface Props {
  item: PostItemFragment | ReplyItemFragment
}

export function PostAnalytics({ item }: Props) {
  const { me } = useMe()

  if (item.user.id === me?.id) return <p>Currently in development - come back soon!</p>
  else return <p>Times this post was seen.</p>
}
