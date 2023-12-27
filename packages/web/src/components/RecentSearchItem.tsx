import { Box, HStack, IconButton, Text, useColorModeValue } from "@chakra-ui/react"
import { GetRecentSearchesDocument, RecentSearchItemFragment, useClearSearchMutation } from "lib/graphql"
import * as React from "react"
import { BiSearch, BiX } from "react-icons/bi"
import NextLink from "next/link"
import { gql } from "@apollo/client"
import { useMutationHandler } from "lib/hooks/useMutationHandler"

const _ = gql`
  mutation ClearSearch($id: String!) {
    clearSearch(id: $id)
  }
`

interface Props {
  search: RecentSearchItemFragment
}

export function RecentSearchItem({ search }: Props) {
  const handler = useMutationHandler()
  const [clearSearch] = useClearSearchMutation({ refetchQueries: [{ query: GetRecentSearchesDocument }] })

  const handleClick = () => {
    return handler(() => clearSearch({ variables: { id: search.id } }))
  }

  const bgHover = useColorModeValue("gray.50", "#182234")

  return (
    <NextLink href={`/search?query=${search.text}`}>
      <HStack _hover={{ bg: bgHover }} p={4} justify="space-between">
        <HStack spacing={5}>
          <Box as={BiSearch} boxSize="25px" />
          <Text>{search.text}</Text>
        </HStack>
        <IconButton
          aria-label={`clear recent search '${search.text}'`}
          icon={<Box as={BiX} boxSize="25px" color="brand.blue" />}
          variant="ghost"
          onClick={(e) => {
            e.preventDefault() // prevent NextLink
            handleClick()
          }}
        />
      </HStack>
    </NextLink>
  )
}
