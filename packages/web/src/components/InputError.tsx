import * as React from "react"
import { FormErrorMessage } from "@chakra-ui/react"

interface Props {
  error?: string | { message?: string | undefined; types?: any }
}

export const InputError: React.FC<Props> = (props) => {
  if (!props.error) return null
  return (
    <>
      {typeof props.error === "string" ? (
        <FormErrorMessage fontSize="xs" color="red.500" m={0} pl={2}>
          {props.error}
        </FormErrorMessage>
      ) : props.error.message ? (
        <FormErrorMessage fontSize="xs" color="red.500" m={0} pl={2}>
          {props.error.message}
        </FormErrorMessage>
      ) : (
        props.error.types &&
        Object.values(props.error.types).map((error, i) => (
          <FormErrorMessage key={i} fontSize="xs" color="red.500" m={0} pl={2}>
            {error as string}
          </FormErrorMessage>
        ))
      )}
    </>
  )
}
