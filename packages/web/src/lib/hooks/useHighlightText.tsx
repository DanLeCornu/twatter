import * as React from "react"
import { Link } from "@chakra-ui/react"

export function getHighlightedText(text: string, higlight?: RegExp) {
  // new RegExp(/\B\#\w+/) // srarts with #
  // Split text on higlight term, include term itself into parts, ignore case
  // var parts = text.split(new RegExp(`(${higlight})`, "gi"));
  const parts = text.split(" ")
  return parts.map((part, index) => (
    <React.Fragment key={index}>
      {part.startsWith("#") || part.startsWith("@") ? (
        <Link onClick={(e) => e.preventDefault()} color="brand.blue">
          {part + " "}
        </Link>
      ) : (
        part + " "
      )}
    </React.Fragment>
  ))
}
