import * as React from "react"
import { gql } from "@apollo/client"
import type { TextareaProps } from "@chakra-ui/react"
import {
  Avatar,
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

import { useGetSearchUsersQuery, useGetTagsQuery } from "lib/graphql"
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
  query GetTags($orderBy: [TagOrderByWithRelationInput!], $where: TagWhereInput, $skip: Int, $take: Int) {
    tags(take: $take, orderBy: $orderBy, where: $where, skip: $skip) {
      items {
        ...TagItem
      }
      count
    }
  }
`

interface Props extends TextareaProps {
  setSubmitDisabled: React.Dispatch<React.SetStateAction<boolean>>
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
  handles: string[]
  setHandles: React.Dispatch<React.SetStateAction<string[]>>
  form: any // TODO form types
}

export function PostTextArea({
  setSubmitDisabled,
  tags,
  setTags,
  handles,
  setHandles,
  form,
  ...props
}: Props) {
  const [tagSearch, setTagSearch] = React.useState("")
  const [handleSearch, setHandleSearch] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [text, setText] = React.useState("")

  const { data: tagData, loading: tagsLoading } = useGetTagsQuery({
    // Eventually will need to filter the query instead of getting all tags and filtering onthe front end, but there
    // were some funky loading states to sort out so that's a problem for future dan
    // variables: {
    //   where: {
    //     name: tagSearch ? { contains: tagSearch, mode: QueryMode.Insensitive } : undefined,
    //   },
    // },
  })
  const allTagOptions = React.useMemo(() => tagData?.tags.items.map((tag) => tag.name) || [], [tagData])

  const { data: userData, loading: usersLoading } = useGetSearchUsersQuery({
    variables: {
      where: {
        handle: { not: { equals: null } },
        // Eventually will need to filter the query instead of getting all users and filtering onthe front end, but
        // there were some funky loading states to sort out so that's a problem for future dan
        // OR: [
        //   { name: handleSearch ? { contains: handleSearch, mode: QueryMode.Insensitive } : undefined },
        //   { handle: handleSearch ? { contains: handleSearch, mode: QueryMode.Insensitive } : undefined },
        // ],
      },
    },
  })
  const allUserOptions = React.useMemo(() => userData?.users.items || [], [userData])

  const matchedTags = React.useCallback(() => {
    return matchSorter(allTagOptions, tagSearch, { threshold: matchSorter.rankings.CONTAINS })
  }, [allTagOptions, tagSearch])

  const matchedUsers = React.useCallback(() => {
    return matchSorter(allUserOptions, handleSearch, {
      keys: ["name", "handle"],
      threshold: matchSorter.rankings.CONTAINS,
    })
  }, [allUserOptions, handleSearch])

  const handleAddTag = React.useCallback(
    (tag: string) => {
      setTags(uniq([...tags, tag]))
      // need to use a state for "text" here because form.getValue("text") was "" because reasons
      const newValue = replaceWithSelectedTag(text, tag, tagSearch)
      setTagSearch("")
      if (newValue === undefined) return
      form.setValue("text", newValue)
      form.setFocus("text") // focus is lost after setting value, so need to refocus the input
    },
    [form, tags, text, setTags, tagSearch],
  )

  const handleAddHandle = React.useCallback(
    (handle?: string | null) => {
      if (!handle) return
      setHandles(uniq([...handles, handle]))
      // need to use a state for "text" here because form.getValue("text") was "" because ... reasons
      const newValue = replaceWithSelectedMention(text, handle, handleSearch)
      setHandleSearch("")
      if (newValue === undefined) return
      form.setValue("text", newValue)
      form.setFocus("text") // focus is lost after setting value, so need to refocus the input
    },
    [form, handles, text, setHandles, handleSearch],
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
          if (selectedIndex + 1 === matchedUsers().length) return
        }
        setSelectedIndex(selectedIndex + 1)
      } else if (e.key === "Enter") {
        if (!!tagSearch && matchedTags().length > 0) {
          e.preventDefault()
          const selectedTag = matchedTags()[selectedIndex]
          handleAddTag(selectedTag)
        } else if (!!handleSearch && matchedUsers().length > 0) {
          e.preventDefault()
          const selectedUser = matchedUsers()[selectedIndex]
          handleAddHandle(selectedUser.handle)
        }
      }
    },
    [selectedIndex, handleAddTag, matchedTags, handleAddHandle, handleSearch, matchedUsers, tagSearch],
  )

  React.useEffect(() => {
    if (!!tagSearch || !!handleSearch) {
      document.addEventListener("keydown", onKeyDown)
    } else {
      setSelectedIndex(0)
      document.removeEventListener("keydown", onKeyDown)
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [tagSearch, handleSearch, onKeyDown])

  const bgHover = useColorModeValue("gray.100", "#182234")
  const popoverBg = useColorModeValue("white", "brand.bgDark")

  const shouldShowSearchList =
    (!!tagSearch && matchedTags().length > 0) || (!!handleSearch && matchedUsers().length > 0)

  const isLoading = tagsLoading || usersLoading

  return (
    <Popover
      isOpen={shouldShowSearchList}
      trigger="hover" // little hack to prevent focus from transferring to the popover
      placement="bottom"
    >
      <Textarea
        name="text"
        pl={1}
        variant="unstyled"
        placeholder={props.placeholder || "What is happening?!"}
        size="lg"
        autoFocus
        resize="none"
        validations={false}
        bordered={false}
        onChange={(e) => {
          setText(e.target.value)
          checkForTags(e.target.value, setTags, setTagSearch)
          checkForMentions(e.target.value, setHandles, setHandleSearch)
          !!e.target.value ? setSubmitDisabled(false) : setSubmitDisabled(true)
        }}
        {...props}
      />
      <PopoverAnchor>
        {/* Anchoring around the textArea wasn't working so doing this little hack instead */}
        <Box />
      </PopoverAnchor>
      <PopoverContent bg={popoverBg} overflow="hidden">
        <PopoverBody p={0}>
          <Stack spacing={0}>
            {isLoading ? (
              <Spinner mx={4} my={3} />
            ) : (
              <>
                {!!tagSearch &&
                  matchedTags().length > 0 &&
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
                  matchedUsers().length > 0 &&
                  matchedUsers().map((matchedUser, i) => (
                    <HStack
                      key={i}
                      onClick={() => handleAddHandle(matchedUser.handle)}
                      _hover={{ bg: bgHover }}
                      cursor="pointer"
                      bg={selectedIndex === i ? bgHover : undefined}
                      px={4}
                      py={3}
                      spacing={3}
                    >
                      <Avatar src={matchedUser.avatar || undefined} boxSize="40px" />
                      <Stack spacing={0}>
                        <Text>{matchedUser.name}</Text>
                        <Text color="gray.400" fontSize="sm">
                          @{matchedUser.handle}
                        </Text>
                      </Stack>
                    </HStack>
                  ))}
              </>
            )}
          </Stack>
        </PopoverBody>
      </PopoverContent>
      {/* Testing tags */}
      {/* <Stack mt="200px">
        <Text>Show popover? {shouldShowSearchList.toString()}</Text>
        <hr />
        <Text>Tags: {tags.join(", ")}</Text>
        <Text>Tag Search: {tagSearch}</Text>
        <Text>Matched Tags: {matchedTags().join(", ")}</Text>
        <hr />
        <Text>Handles: {handles.join(", ")}</Text>
        <Text>Handle Search: {handleSearch}</Text>
        <Text>Matched Handles: {matchedHandles().join(", ")}</Text>
      </Stack> */}
    </Popover>
  )
}
