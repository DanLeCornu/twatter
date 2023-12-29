import { gql } from "@apollo/client"
import { Stack, Text } from "@chakra-ui/react"
import { ExploreTagItemFragment } from "lib/graphql"
import * as React from "react"
import NextLink from "next/link"

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
