import * as React from "react"
import { gql } from "@apollo/client"

import { useCreateViewMutation } from "lib/graphql"

import { useMe } from "./useMe"

const _ = gql`
  mutation CreateView($postId: String!) {
    createView(postId: $postId)
  }
`

export function useViewPost(postId: string) {
  const { me } = useMe()
  const [createView] = useCreateViewMutation()
  const handleCreateView = async () => {
    try {
      if (!me) return
      await createView({ variables: { postId } })
    } catch {
      console.log("error creating view")
    }
  }
  React.useEffect(() => {
    ;(async () => {
      if (!postId) return
      handleCreateView()
    })()
    // eslint-disable-next-line
  }, [])

  return handleCreateView
}
