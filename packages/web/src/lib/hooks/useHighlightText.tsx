import * as React from "react"
import { Link } from "@chakra-ui/react"
import NextLink from "next/link"

export function useHighlightedText(text: string, mentions: string[]) {
  const parts = text.split(" ")
  return parts.map((part, index) => (
    <React.Fragment key={index}>
      {part.startsWith("#") || (part.startsWith("@") && mentions.includes(part)) ? (
        <Link color="brand.blue" onClick={(e) => e.preventDefault()}>
          <NextLink href={part.startsWith("@") ? `/${part.replace("@", "")}` : "/explore"}>
            {part + " "}
          </NextLink>
        </Link>
      ) : (
        part + " "
      )}
    </React.Fragment>
  ))
}
