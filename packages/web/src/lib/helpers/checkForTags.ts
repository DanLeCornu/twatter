import { uniq } from "./utils"

export const checkForTags = (
  value: string,
  setTags: (value: React.SetStateAction<string[]>) => void,
  setTagSearch: (value: React.SetStateAction<string>) => void,
) => {
  // if input is empty or just "#"
  if (!!!value || value === "#") {
    setTags([])
    setTagSearch("")
    return
  }

  const words = value
    .replace(/\n/g, " ") // replace all linebreaks with spaces
    .replace(/[.,\/!?$%\^&\*;:{}=\-_`~()]/g, "") // remove all punctuation (except #)
    .split(" ") // split by space

  // Check if there are some tags
  if (words.filter((word) => word.startsWith("#") && word.length > 1).length > 0) {
    // Reset the search if last word is space or '#', or is a non-tagged word (don't use pop here, it mutates the array)
    if (["", "#"].includes(words[words.length - 1]) || !words[words.length - 1].startsWith("#")) {
      setTagSearch("")
    } else {
      // else, there must be an unfinished tag at the end of the word list
      const all = words.filter((word) => word.startsWith("#") && word.length > 1)
      const latestUnfinishedTag = all[all.length - 1] // don't use pop here, it mutates the array
      if (latestUnfinishedTag) setTagSearch(latestUnfinishedTag.replace("#", ""))
    }
  }

  // if word array is only one big, do nothing yet
  if (words.length === 1) return

  // 1: slice off the last element of the array because it is always either a space or an unfinished word
  // 2: filter only those starting with '#' (but are not only '#')
  // 3: remove the actual '#' before storing in tag array
  // 4: get a uniq set
  setTags(
    uniq(
      words
        .slice(0, -1)
        .filter((word) => word.startsWith("#") && word.length > 1)
        .map((word) => word.replace("#", "")),
    ),
  )
}
