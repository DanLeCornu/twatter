import * as React from "react"
import { BiSearch, BiX } from "react-icons/bi"
import type { InputProps } from "@chakra-ui/react"
import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react"
import { useRouter } from "next/router"

import { GetRecentSearchesDocument, useLogSearchMutation } from "lib/graphql"
import { useMutationHandler } from "lib/hooks/useMutationHandler"

interface Props extends InputProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  isSearchActive: boolean
  setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>
}

export function ExploreSearch({ search, setSearch, isSearchActive, setIsSearchActive, ...props }: Props) {
  const router = useRouter()
  const handler = useMutationHandler()
  const [logSearch] = useLogSearchMutation({ refetchQueries: [{ query: GetRecentSearchesDocument }] })
  const [previousSearch, setPreviousSearch] = React.useState("")

  const handleSubmit = () => {
    if (!search || search.trim() === previousSearch.trim()) return
    setPreviousSearch(search.trim())
    handler(() => logSearch({ variables: { text: search.trim() } })) // async log the search without blocking
    setIsSearchActive(false)
    router.push(`/search?q=${search}`)
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault() // stops page refreshing, default html form behaviour
        handleSubmit()
      }}
    >
      <InputGroup>
        <InputLeftElement h="100%" pl={2}>
          <Flex align="center">
            <IconButton
              rounded="full"
              size="sm"
              aria-label="search"
              variant="ghost"
              color={isSearchActive ? "brand.blue" : "gray.500"}
              icon={<Box as={BiSearch} boxSize="20px" />}
              type="submit"
            />
          </Flex>
        </InputLeftElement>
        <Input
          rounded="full"
          pl="50px !important"
          px={10}
          size="sm"
          value={search}
          {...props}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          fontSize="15px"
          onClick={() => setIsSearchActive(true)}
        />
        <InputRightElement h="100%" pr={2}>
          {!!search && (
            <IconButton
              rounded="full"
              onClick={() => setSearch("")}
              size="xs"
              aria-label="clear search"
              icon={<Box as={BiX} boxSize="20px" color="black.500" />}
            />
          )}
        </InputRightElement>
      </InputGroup>
    </form>
  )
}
