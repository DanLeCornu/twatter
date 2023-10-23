import * as React from "react"
import { useFormContext } from "react-hook-form"
import type { InputProps } from "@chakra-ui/react"
import { Box, Flex, Text } from "@chakra-ui/react"
import { FormControl, Input as CInput } from "@chakra-ui/react"

import { InputError } from "./InputError"
import { InputLabel } from "./InputLabel"

interface Props extends InputProps {
  name: string
  label?: string
  subLabel?: string
  maxLength?: number
  bordered?: boolean
  validations?: boolean
}

export const Input = ({
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
    trigger,
  } = useFormContext()
  const fieldError = errors?.[name]

  const initialCharCount = getValues(name)?.length || 0
  const [charCount, setCharCount] = React.useState(initialCharCount)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    register(name).onChange(e)
    if (e?.target?.value?.length <= 1) trigger(name)
    setCharCount(e?.target?.value?.toString().length || 0)
  }

  return (
    <FormControl isInvalid={!!fieldError} isRequired={props.isRequired}>
      <Box
        px={2}
        py={1}
        borderWidth={bordered ? "1px" : undefined}
        rounded="md"
        borderColor={!!fieldError ? "red.500 !important" : "gray.600"}
        sx={{
          "&:has(input:focus)": {
            borderColor: "blue.500",
          },
        }}
      >
        <Flex
          justify="space-between"
          sx={{
            "&:has(~ input:focus) > label": {
              color: "blue.500",
            },
            "&:has(~ input:focus) > p": {
              visibility: "visible",
            },
          }}
        >
          {label && (
            <InputLabel
              label={label}
              subLabel={subLabel}
              name={name}
              color={!!fieldError ? "red.500 !important" : "gray.400"}
              w="100%"
            />
          )}
          {maxLength && (
            <Text fontSize="sm" color="gray.400" minW="60px" textAlign="right" visibility="hidden">
              {charCount} / {maxLength}
            </Text>
          )}
        </Flex>
        <CInput
          id={name}
          {...register(name)}
          {...props}
          onChange={handleOnChange}
          variant="unstyled"
          maxLength={maxLength}
          autoCapitalize="none"
        />
      </Box>
      {validations && <InputError error={fieldError} />}
    </FormControl>
  )
}
