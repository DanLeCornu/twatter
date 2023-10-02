import { gql, useApolloClient } from "@apollo/client"
import { useRouter } from "next/router"

import { ACCESS_TOKEN } from "lib/config"
import { useLogoutMutation } from "lib/graphql"

import { useMutationHandler } from "./useMutationHandler"

const _ = gql`
  mutation Logout {
    logout
  }
`

export const useLogout = () => {
  const client = useApolloClient()
  const [logout] = useLogoutMutation()
  const router = useRouter()
  const handler = useMutationHandler()

  const handleLogout = async () => {
    return handler(() => logout(), {
      onSuccess: async (_, toast) => {
        await router.replace("/logout")
        localStorage.removeItem(ACCESS_TOKEN)
        await fetch("/api/logout", { method: "post" })
        await client.resetStore()
        toast({ description: "Successfully logged out!" })
      },
    })
  }
  return handleLogout
}
