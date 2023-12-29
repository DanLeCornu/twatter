import { Box, HStack, Text, useColorModeValue } from "@chakra-ui/react"
import { TagItemFragment } from "lib/graphql"
import * as React from "react"
import { BiSearch } from "react-icons/bi"
import NextLink from "next/link"

interface Props {
  tag: TagItemFragment
  setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>
}

export function TagSearchItem({ tag, setIsSearchActive }: Props) {
  const bgHover = useColorModeValue("gray.50", "#182234")
  return (
    <NextLink href={`/search?q=${tag.name}`}>
      <HStack _hover={{ bg: bgHover }} p={4} spacing={5} onClick={() => setIsSearchActive(false)}>
        <Box as={BiSearch} boxSize="25px" />
        <Text>#{tag.name}</Text>
      </HStack>
    </NextLink>
  )
}
