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

export const DateInput = ({ name, minDate, maxDate, ...props }: DateInputProps) => {
  const { register, setValue, trigger } = useFormContext()
  const value = useWatch({ name })

  const handleChange = (date: string) => {
    setValue(name, date, { shouldDirty: true })
    trigger(name)
  }

  React.useEffect(() => {
    register(name)
  }, [register, name])

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
        customInput={<CustomInput {...props} name={name} inputName={name} />}
      />
    </Box>
  )
}

function _CustomInput(
  { label, subLabel, inputName, ...props }: DateInputProps & { inputName: string },
  ref: React.Ref<HTMLInputElement>,
) {
  const {
    formState: { errors },
  } = useFormContext()
  const fieldError = errors?.[inputName]

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
            <InputLabel
              label={label}
              name={inputName}
              color={!!fieldError ? "red.500" : "gray.400"}
              w="100%"
            />
          )}
        </Flex>
        <CInput ref={ref} {...props} variant="unstyled" />
      </Box>
      <InputError error={fieldError} />
    </FormControl>
  )
}

const CustomInput = React.forwardRef(_CustomInput)
