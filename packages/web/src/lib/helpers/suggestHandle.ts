import { randomNumber } from "./utils"

export const suggestHandle = (name: string) => {
  const MAX = 15
  let handle: string

  // name (without spaces) plus 4 digit random number
  handle = name.replaceAll(" ", "") + randomNumber(4).toString()
  if (handle.length <= MAX) return handle

  // If name is multiple words (separated by a space)
  if (name.split(" ").length > 0) {
    // take first word, plus 4 digit number
    handle = name.split(" ")[0] + randomNumber(4).toString()
    if (handle.length <= MAX) return handle

    // take first three letters from first and last words, plus 4 digit number
    handle =
      name.split(" ")[0].substring(0, 3) +
      "_" +
      name.split(" ").pop()?.substring(0, 3) +
      randomNumber(4).toString()
    if (handle.length <= MAX) return handle
  }

  // If still too long, give up
  return ""
}
