import * as React from "react"
import { Link } from "@chakra-ui/react"
import NextLink from "next/link"

export function useHighlightedText(text: string, higlight?: RegExp) {
  // new RegExp(/\B\#\w+/) // srarts with #
  // Split text on higlight term, include term itself into parts, ignore case
  // var parts = text.split(new RegExp(`(${higlight})`, "gi"));
  const parts = text.split(" ")
  return parts.map((part, index) => (
    <React.Fragment key={index}>
      {part.startsWith("#") || part.startsWith("@") ? (
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
