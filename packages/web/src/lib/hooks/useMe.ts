import type { QueryHookOptions } from "@apollo/client"
import { gql } from "@apollo/client"

import type { MeQuery, MeQueryVariables } from "lib/graphql"
import { useMeQuery } from "lib/graphql"

export const _ = gql`
  fragment BlockedMutedAccount on User {
    id
    avatar
    name
    handle
  }

  fragment Me on User {
    id
    email
    role
    avatar
    cover
    handle
    name
    bio
    location
    website
    dob
    dobDayMonthPrivacy
    dobYearPrivacy
    allowMessagesFrom
    followingCount
    followerCount
    createdAt
    pinnedPost {
      ...PostItem
    }
    likes {
      postId
    }
    following {
      id
    }
    mutedAccounts {
      ...BlockedMutedAccount
    }
    blockedAccounts {
      ...BlockedMutedAccount
    }
    createdReports {
      id
      type
      userId
      postId
      replyId
    }
  }
  query Me {
    me {
      ...Me
    }
  }
`

export function useMe(options?: QueryHookOptions<MeQuery, MeQueryVariables>) {
  const res = useMeQuery(options)
  return { me: res.data?.me, ...res }
}
