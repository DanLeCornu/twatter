import * as React from "react"
import { gql } from "@apollo/client"
import { Box, HStack, IconButton, Text, useColorModeValue } from "@chakra-ui/react"
import { Search, X } from "lucide-react"
import NextLink from "next/link"

import type { RecentSearchItemFragment } from "lib/graphql"
import { GetRecentSearchesDocument, useClearSearchMutation } from "lib/graphql"
import { useMutationHandler } from "lib/hooks/useMutationHandler"

const _ = gql`
  mutation ClearSearch($id: String!) {
    clearSearch(id: $id)
  }
`

interface Props {
  recentSearch: RecentSearchItemFragment
  setSearch: React.Dispatch<React.SetStateAction<string>>
  setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>
}

export function RecentSearchItem({ recentSearch, setSearch, setIsSearchActive }: Props) {
  const handler = useMutationHandler()
  const [clearSearch] = useClearSearchMutation({ refetchQueries: [{ query: GetRecentSearchesDocument }] })

  const handleClick = () => {
    setIsSearchActive(false)
    setSearch(recentSearch.text)
  }
  const handleClear = () => {
    return handler(() => clearSearch({ variables: { id: recentSearch.id } }))
  }

  const bgHover = useColorModeValue("gray.50", "#182234")

  return (
    <NextLink href={`/search?q=${recentSearch.text}`}>
      <HStack _hover={{ bg: bgHover }} p={4} justify="space-between" onClick={handleClick}>
        <HStack spacing={5}>
          <Box as={Search} boxSize="25px" />
          <Text>{recentSearch.text}</Text>
        </HStack>
        <IconButton
          aria-label={`clear recent search '${recentSearch.text}'`}
          icon={<Box as={X} boxSize="25px" color="brand.blue" />}
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation() // Prevent handleClick firing
            e.preventDefault() // prevent NextLink
            handleClear()
          }}
        />
      </HStack>
    </NextLink>
  )
}
