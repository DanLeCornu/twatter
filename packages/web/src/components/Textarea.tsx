import * as React from "react"
import { useFormContext } from "react-hook-form"
import type { TextareaProps } from "@chakra-ui/react"
import { Box, Flex, FormControl, Text, Textarea as CTextarea } from "@chakra-ui/react"

import { InputError } from "./InputError"
import { InputLabel } from "./InputLabel"

interface Props extends TextareaProps {
  name: string
  label?: string
  subLabel?: string
  maxLength?: number
  bordered?: boolean
  validations?: boolean
}

export const Textarea = ({
  name,
  label,
  subLabel,
  maxLength,
  bordered = true,
  validations = true,
  ...props
}: Props) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext()
  const fieldError = errors?.[name]

  const initialCharCount = getValues(name)?.length || 0
  const [charCount, setCharCount] = React.useState(initialCharCount)

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e?.target?.value?.toString().length || 0)
  }

  return (
    <FormControl isInvalid={!!fieldError} isRequired={props.isRequired}>
      <Box
        px={2}
        py={1}
        borderWidth={bordered ? "1px" : undefined}
        rounded="md"
        borderColor={fieldError ? "red.500" : "gray.600"}
        // minH="50px"
        sx={{
          "&:has(textarea:focus)": {
            borderColor: "blue.500",
          },
        }}
      >
        <Flex
          justify="space-between"
          sx={{
            "&:has(~ textarea:focus) > label": {
              color: "blue.500",
            },
            "&:has(~ textarea:focus) > p": {
              visibility: "visible",
            },
          }}
        >
          {label && (
            <InputLabel
              label={label}
              subLabel={subLabel}
              name={name}
              color={fieldError ? "red.500" : "gray.400"}
              w="100%"
            />
          )}
          {maxLength && (
            <Text fontSize="sm" color="gray.400" minW="60px" textAlign="right" visibility="hidden">
              {charCount} / {maxLength}
            </Text>
          )}
        </Flex>
        <CTextarea
          id={name}
          {...register(name)}
          variant="unstyled"
          onChange={handleOnChange}
          resize="none"
          minH="50px"
          {...props}
        />
      </Box>
      {validations && <InputError error={fieldError} />}
    </FormControl>
  )
}
