import * as React from "react"
import { gql } from "@apollo/client"
import { Stack, Text } from "@chakra-ui/react"
import NextLink from "next/link"

import type { ExploreTagItemFragment } from "lib/graphql"

const _ = gql`
  fragment ExploreTagItem on Tag {
    id
    name
    postCount
  }
`

interface Props {
  tag: ExploreTagItemFragment
}

export function ExploreTrendItem({ tag }: Props) {
  return (
    <NextLink href={`/search?q=${tag.name}`}>
      <Stack spacing={0}>
        <Text fontWeight="medium">#{tag.name}</Text>
        <Text fontSize="sm" color="gray.400">
          {tag.postCount.toLocaleString()} posts
        </Text>
      </Stack>
    </NextLink>
  )
}
