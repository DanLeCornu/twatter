import * as React from "react"
import { Box, HStack, Text, useColorModeValue } from "@chakra-ui/react"
import { Search } from "lucide-react"
import NextLink from "next/link"

import type { TagItemFragment } from "lib/graphql"

interface Props {
  tag: TagItemFragment
  setSearch: React.Dispatch<React.SetStateAction<string>>
  setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>
}

export function TagSearchItem({ tag, setSearch, setIsSearchActive }: Props) {
  const bgHover = useColorModeValue("gray.50", "#182234")
  const handleClick = () => {
    setIsSearchActive(false)
    setSearch(tag.name)
  }
  return (
    <NextLink href={`/search?q=${tag.name}`}>
      <HStack _hover={{ bg: bgHover }} p={4} spacing={5} onClick={handleClick}>
        <Box as={Search} boxSize="25px" />
        <Text>#{tag.name}</Text>
      </HStack>
    </NextLink>
  )
}
