import { Box, HStack, Text, useColorModeValue } from "@chakra-ui/react"
import { TagItemFragment } from "lib/graphql"
import * as React from "react"
import { BiSearch } from "react-icons/bi"
import NextLink from "next/link"

interface Props {
  tag: TagItemFragment
}

export function TagSearchItem({ tag }: Props) {
  const bgHover = useColorModeValue("gray.50", "#182234")
  return (
    <NextLink href={`/search?tag=${tag.name}`}>
      <HStack _hover={{ bg: bgHover }} p={4} spacing={5}>
        <Box as={BiSearch} boxSize="25px" />
        <Text>#{tag.name}</Text>
      </HStack>
    </NextLink>
  )
}
