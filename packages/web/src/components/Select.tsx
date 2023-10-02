import * as React from "react"
import { useFormContext } from "react-hook-form"
import type { SelectProps } from "@chakra-ui/react"
import { Box, Flex, FormControl, Select as CSelect } from "@chakra-ui/react"

import { InputError } from "./InputError"
import { InputLabel } from "./InputLabel"

interface Props extends SelectProps {
  name: string
  options: any[]
  label?: string
  subLabel?: string
}

export const Select = ({ name, options, label, subLabel, ...props }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const fieldError = errors?.[name]
  return (
    <FormControl isInvalid={!!fieldError} isRequired={props.isRequired}>
      <Box
        px={2}
        py={1}
        borderWidth="1px"
        rounded="md"
        borderColor={!!fieldError ? "red.500 !important" : "gray.600"}
        sx={{
          "&:has(select:focus)": {
            borderColor: "blue.500",
          },
        }}
      >
        <Flex
          justify="space-between"
          sx={{
            "&:has(~ select:focus) > label": {
              color: "blue.500",
            },
            "&:has(~ select:focus) > p": {
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
        </Flex>
        <CSelect id={name} {...register(name)} variant="unstyled" {...props} mb={0}>
          {props.placeholder && (
            <option value="" disabled>
              {props.placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option
              key={index}
              value={typeof option === "string" || typeof option === "number" ? option : option.value}
            >
              {typeof option === "string" || typeof option === "number" ? option : option.label}
            </option>
          ))}
        </CSelect>
      </Box>
      <InputError error={fieldError} />
    </FormControl>
  )
}
