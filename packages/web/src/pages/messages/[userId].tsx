import * as React from "react"
import { useRouter } from "next/router"

export default function Message() {
  const router = useRouter()
  const userId = router.query.userId as string
  return <p>{userId}</p>
}
