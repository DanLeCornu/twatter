export const replaceWithSelectTag = (value: string, tag: string) => {
  const words = value
    .replace(/\n/g, " ") // replace all linebreaks with spaces
    .replace(/[.,\/!?$%\^&\*;:{}=\-_`~()]/g, "") // remove all punctuation (excluding #)
    .split(" ") // split by space

  // find the last word that is a subtring of the selected tag, and return the (reversed) index of that substring
  let index: number | undefined = undefined
  const fig = words.reverse().find((word, i) => {
    if (("#" + tag).includes(word)) {
      index = i
      return true
    }
  })
  if (!fig) return undefined

  if (index !== undefined) {
    words.splice(index, 1, "#" + tag) // replace the partial searched tag with the full tag
  }

  return words.reverse().join(" ") + " " // re-reverse the words, join, and add a space to the end to signal tag is complete
}
