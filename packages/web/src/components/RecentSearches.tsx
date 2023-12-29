import * as React from "react"
import { gql } from "@apollo/client"
import { Button, HStack, Stack, Text, useDisclosure } from "@chakra-ui/react"

import {
  GetRecentSearchesDocument,
  useClearAllSearchesMutation,
  useGetRecentSearchesQuery,
} from "lib/graphql"
import { useMutationHandler } from "lib/hooks/useMutationHandler"

import { Modal } from "./Modal"
import { RecentSearchItem } from "./RecentSearchItem"

const _ = gql`
  fragment RecentSearchItem on Search {
    id
    text
  }
  query GetRecentSearches {
    recentSearches {
      items {
        ...RecentSearchItem
      }
      count
    }
  }
  mutation ClearAllSearches {
    clearAllSearches
  }
`

interface Props {
  setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>
}

export function RecentSearches({ setIsSearchActive }: Props) {
  const modalProps = useDisclosure()
  const handler = useMutationHandler()

  const { data, loading } = useGetRecentSearchesQuery()
  const [clearAllSearches, { loading: clearAllLoading }] = useClearAllSearchesMutation({
    refetchQueries: [{ query: GetRecentSearchesDocument }],
  })

  const recentSearches = data?.recentSearches.items || []

  const handleClearAll = () => {
    return handler(() => clearAllSearches(), {
      onSuccess: () => {
        modalProps.onClose()
      },
    })
  }

  if (loading) return null

  return recentSearches.length === 0 ? (
    <Text fontSize="sm" color="gray.400" textAlign="center" w="100%">
      Try searching for people, tags, or keywords
    </Text>
  ) : (
    <>
      <HStack justify="space-between" px={4}>
        <Text fontSize="lg" fontWeight="bold">
          Recent
        </Text>
        <Button variant="ghost" onClick={modalProps.onOpen} color="brand.blue" size="sm">
          Clear all
        </Button>
      </HStack>
      {recentSearches.map((search, i) => (
        <RecentSearchItem key={i} search={search} setIsSearchActive={setIsSearchActive} />
      ))}
      <Modal {...modalProps} title="Clear all recent searches?">
        <Text mb={6}>This can't be undone and you'll remove all your recent searches</Text>
        <Stack>
          <Button onClick={handleClearAll} isLoading={clearAllLoading} bg="red" _hover={{ bg: "red" }}>
            Clear
          </Button>
          <Button colorScheme="monochrome" variant="outline" onClick={modalProps.onClose}>
            Cancel
          </Button>
        </Stack>
      </Modal>
    </>
  )
}
