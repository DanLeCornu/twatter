export const replaceWithSelectedMention = (value: string, handle: string) => {
  const words = value
    .replace(/\n/g, " ") // replace all linebreaks with spaces
    .replace(/[.,\/!?$%\^&\*;:{}=\-_`~()]/g, "") // remove all punctuation (excluding @)
    .split(" ") // split by space
  // .split(/\s+/) // split by space or linebreak

  // find the last word that is a subtring of the selected handle, and return the (reversed) index of that substring
  let index: number | undefined = undefined
  const fig = words.reverse().find((word, i) => {
    if (("@" + handle).includes(word)) {
      index = i
      return true
    }
  })
  if (!fig) return undefined

  if (index !== undefined) {
    words.splice(index, 1, "@" + handle) // replace the partial searched handle with the full handle
  }

  return words.reverse().join(" ") + " " // re-reverse the words, join, and add a space to the end to signal handle is complete
}
