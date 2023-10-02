import * as React from "react"
import DatePicker from "react-datepicker"
import { useWatch } from "react-hook-form"
import type { InputProps } from "@chakra-ui/react"
import { Box, Flex, FormControl, Input as CInput } from "@chakra-ui/react"
import dayjs from "dayjs"
import "react-datepicker/dist/react-datepicker.css"

import { useFormContext } from "lib/hooks/useForm"

import { InputError } from "./InputError"
import { InputLabel } from "./InputLabel"

interface DateInputProps extends InputProps {
  name: string
  label?: string
  subLabel?: string
  minDate?: Date
  maxDate?: Date
}

export const DateInput = ({ minDate, maxDate, ...props }: DateInputProps) => {
  const { register, setValue } = useFormContext()
  const value = useWatch({ name: props.name })

  const handleChange = (date: string) => setValue(props.name, date, { shouldDirty: true })

  React.useEffect(() => {
    register(props.name)
  }, [register, props.name])

  return (
    <Box>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        disabled={props.isDisabled}
        dropdownMode="select"
        showPopperArrow={false}
        fixedHeight
        maxDate={maxDate}
        minDate={minDate}
        selected={value ? dayjs(value).toDate() : undefined}
        onChange={(date) => {
          handleChange(date ? dayjs(date as Date).format("YYYY-MM-DD") : "")
        }}
        customInput={<CustomInput {...props} />}
      />
    </Box>
  )
}

interface CustomInputProps extends DateInputProps {
  ref: React.Ref<HTMLInputElement>
}

function _CustomInput({ ref, name, label, ...props }: CustomInputProps) {
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
        borderColor={!!fieldError ? "red.500" : "gray.600"}
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
          }}
        >
          {label && (
            <InputLabel label={label} name={name} color={!!fieldError ? "red.500" : "gray.400"} w="100%" />
          )}
        </Flex>
        <CInput id={name} {...register(name)} ref={ref} {...props} variant="unstyled" />
      </Box>
      <InputError error={fieldError} />
    </FormControl>
  )
}

const CustomInput = React.forwardRef(_CustomInput)
