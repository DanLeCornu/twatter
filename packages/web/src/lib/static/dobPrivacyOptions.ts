import { DobPrivacy } from "lib/graphql"

export const DOB_PRIVACY_OPTIONS: { value: DobPrivacy; label: string }[] = [
  { value: DobPrivacy.Public, label: "Public" },
  // { value: DobPrivacy.Followers, label: "Your followers" },
  // { value: DobPrivacy.Following, label: "People you follow" },
  // { value: DobPrivacy.MutualFollow, label: "You follow each other" },
  { value: DobPrivacy.Private, label: "Only you" },
]
