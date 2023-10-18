import * as React from "react"
import { gql } from "@apollo/client"
import {
  Box,
  HStack,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { matchSorter } from "match-sorter"

import { QueryMode, useGetSearchUsersQuery, useGetTagsQuery } from "lib/graphql"
import { checkForMentions } from "lib/helpers/checkForMentions"
import { checkForTags } from "lib/helpers/checkForTags"
import { replaceWithSelectedMention } from "lib/helpers/replaceWithSelectedMention"
import { replaceWithSelectedTag } from "lib/helpers/replaceWithSelectedTag"
import { uniq } from "lib/helpers/utils"

import { Textarea } from "./Textarea"

const _ = gql`
  fragment TagItem on Tag {
    id
    name
  }
  query GetTags($where: TagWhereInput) {
    tags(take: 8, where: $where) {
      items {
        ...TagItem
      }
      count
    }
  }
`

interface Props {
  hasImage: boolean
  setSubmitDisabled: React.Dispatch<React.SetStateAction<boolean>>
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
  handles: string[]
  setHandles: React.Dispatch<React.SetStateAction<string[]>>
  form: any // TODO types
}

export function PostTextArea({
  hasImage,
  setSubmitDisabled,
  tags,
  setTags,
  handles,
  setHandles,
  form,
}: Props) {
  const [tagSearch, setTagSearch] = React.useState("")
  const [handleSearch, setHandleSearch] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [text, setText] = React.useState("")

  const { data: tagData, loading: tagLoading } = useGetTagsQuery({
    variables: {
      where: {
        name: tagSearch ? { contains: tagSearch, mode: QueryMode.Insensitive } : undefined,
      },
    },
  })
  const allTagOptions = React.useMemo(() => tagData?.tags.items.map((tag) => tag.name) || [], [tagData])

  const { data: userData, loading: userLoading } = useGetSearchUsersQuery({
    variables: {
      where: {
        handle: { not: { equals: null } },
        OR: [
          { name: handleSearch ? { contains: handleSearch, mode: QueryMode.Insensitive } : undefined },
          { handle: handleSearch ? { contains: handleSearch, mode: QueryMode.Insensitive } : undefined },
        ],
      },
    },
  })
  const allUserOptions = React.useMemo(
    () => userData?.users.items.map((user) => user.handle as string) || [],
    [userData],
  )

  console.log("allUserOptions", allUserOptions)

  // TODO review below, maybe no longer necessary as already querying from the backend
  const matchedTags = React.useCallback(() => {
    return matchSorter(allTagOptions, tagSearch, { threshold: matchSorter.rankings.STARTS_WITH })
  }, [allTagOptions, tagSearch])

  const matchedHandles = React.useCallback(() => {
    return matchSorter(allUserOptions, handleSearch, { threshold: matchSorter.rankings.STARTS_WITH })
  }, [allUserOptions, handleSearch])

  console.log("matchedHandles", matchedHandles())

  const handleAddTag = React.useCallback(
    (tag: string) => {
      setTagSearch("")
      setTags(uniq([...tags, tag]))
      // need to use a state for "text" here because form.getValue("text") was "" because reasons
      const newValue = replaceWithSelectedTag(text, tag)
      if (newValue === undefined) return
      form.setValue("text", newValue)
      form.setFocus("text") // focus is lost after setting value, so need to refocus the input
    },
    [form, tags, text, setTags],
  )

  const handleAddHandle = React.useCallback(
    (handle: string) => {
      setHandleSearch("")
      setHandles(uniq([...handles, handle]))
      // need to use a state for "text" here because form.getValue("text") was "" because reasons
      const newValue = replaceWithSelectedMention(text, handle)
      if (newValue === undefined) return
      form.setValue("text", newValue)
      form.setFocus("text") // focus is lost after setting value, so need to refocus the input
    },
    [form, handles, text, setHandles],
  )

  const onKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault()
        if (selectedIndex === 0) return
        setSelectedIndex(selectedIndex - 1)
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        if (!!tagSearch) {
          if (selectedIndex + 1 === matchedTags().length) return
        } else if (!!handleSearch) {
          if (selectedIndex + 1 === matchedHandles().length) return
        }
        setSelectedIndex(selectedIndex + 1)
      } else if (e.key === "Enter") {
        if (!!tagSearch && matchedTags().length > 0) {
          e.preventDefault()
          const selectedTag = matchedTags()[selectedIndex]
          handleAddTag(selectedTag)
        } else if (!!handleSearch && matchedHandles().length > 0) {
          e.preventDefault()
          const selectedHandle = matchedHandles()[selectedIndex]
          handleAddHandle(selectedHandle)
        }
      }
    },
    [selectedIndex, handleAddTag, matchedTags, handleAddHandle, handleSearch, matchedHandles, tagSearch],
  )

  React.useEffect(() => {
    if (!!tagSearch || !!handleSearch) {
      document.addEventListener("keydown", onKeyDown)
    } else {
      setSelectedIndex(0)
      // setSelectedHandleIndex(0)
      document.removeEventListener("keydown", onKeyDown)
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [tagSearch, handleSearch, onKeyDown])

  const bgHover = useColorModeValue("gray.100", "#182234")
  const popoverBg = useColorModeValue("white", "brand.bgDark")

  const shouldShowSearchList =
    (!!tagSearch && matchedTags().length > 0) || (!!handleSearch && matchedHandles().length > 0)

  const isLoading = tagLoading || userLoading

  return (
    <Popover
      isOpen={shouldShowSearchList}
      trigger="hover" // little hack to prevent focus from transferring to the popover
      placement="bottom"
    >
      <Textarea
        name="text"
        h={hasImage ? "40px" : "150px"}
        pl={1}
        variant="unstyled"
        placeholder="What is happening?!"
        size="lg"
        autoFocus
        resize="none"
        validations={false}
        bordered={false}
        onChange={(e) => {
          setText(e.target.value)
          checkForTags(e.target.value, setTags, setTagSearch)
          checkForMentions(e.target.value, setHandles, setHandleSearch)
          e.target.value ? setSubmitDisabled(false) : setSubmitDisabled(true)
        }}
      />
      <PopoverAnchor>
        {/* Anchoring around the textArea wasn't working so doing this little hack instead */}
        <Box />
      </PopoverAnchor>
      <PopoverContent bg={popoverBg} overflow="hidden">
        <PopoverBody p={0}>
          {isLoading ? (
            <HStack>
              <Spinner />
            </HStack>
          ) : (
            <Stack spacing={0}>
              {!!tagSearch &&
                matchedTags().map((matchedTag, i) => (
                  <Text
                    key={i}
                    onClick={() => handleAddTag(matchedTag)}
                    _hover={{ bg: bgHover }}
                    cursor="pointer"
                    bg={selectedIndex === i ? bgHover : undefined}
                    px={4}
                    py={3}
                  >
                    #{matchedTag}
                  </Text>
                ))}
              {!!handleSearch &&
                matchedHandles().map((matchedHandle, i) => (
                  <Text
                    key={i}
                    onClick={() => handleAddHandle(matchedHandle)}
                    _hover={{ bg: bgHover }}
                    cursor="pointer"
                    bg={selectedIndex === i ? bgHover : undefined}
                    px={4}
                    py={3}
                  >
                    @{matchedHandle}
                  </Text>
                ))}
            </Stack>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
