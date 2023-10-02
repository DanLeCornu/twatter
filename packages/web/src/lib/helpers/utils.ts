import dayjs from "dayjs"

export const random = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const postTimeFromNow = (createdAt: string) => {
  const today = dayjs()
  const postDate = dayjs(createdAt)

  if (today.diff(postDate, "seconds") === 0) {
    return "1s"
  } else if (today.diff(postDate, "seconds") <= 60) {
    return `${today.diff(postDate, "seconds")}s`
  } else if (today.diff(postDate, "minutes") <= 60) {
    return `${today.diff(postDate, "minutes")}m`
  } else if (today.diff(postDate, "hours") <= 24) {
    return `${today.diff(postDate, "hours")}h`
  } else {
    return postDate.format("MMM DD")
  }
}
