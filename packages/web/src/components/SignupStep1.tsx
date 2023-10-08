import * as React from "react"
import { gql } from "@apollo/client"
import { Button, Heading, Stack, Text } from "@chakra-ui/react"

import { useVerifyMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import yup from "lib/yup"

import { DateInput } from "./DateInput"
import { Form } from "./Form"
import { FormError } from "./FormError"
import { Input } from "./Input"

const _ = gql`
  mutation Verify($data: VerifyInput!) {
    verify(data: $data)
  }
`

const Step1Schema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  dob: yup.string().nullIfEmpty().required("Required"),
})

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>
  setEmail: React.Dispatch<React.SetStateAction<string>>
}

export function SignupStep1({ setStep, setEmail }: Props) {
  const [verify, { loading: verifyLoading }] = useVerifyMutation()

  const form = useForm({ schema: Step1Schema })

  const onSubmit = (data: yup.InferType<typeof Step1Schema>) => {
    return form.handler(() => verify({ variables: { data } }), {
      onAppError: () => form.setError("email", { message: "Email has already been taken" }),
      onSuccess: async () => {
        setEmail(data.email)
        setStep(2)
      },
    })
  }
  return (
    <Form onSubmit={onSubmit} {...form}>
      <Stack w={["100%", 400]} px={2} pt={6} spacing={6}>
        <Stack spacing={8}>
          <Heading as="h1" fontSize="2xl">
            Create your account
          </Heading>
          <Stack spacing={6}>
            <Input name="name" label="Name" maxLength={50} autoFocus />
            <Input name="email" label="Email" />
          </Stack>
          <FormError />
        </Stack>
        <Stack spacing={5}>
          <Stack spacing={0}>
            <Text fontWeight="bold">Date of birth</Text>
            <Text color="gray.400" fontSize="14px" lineHeight="16px">
              This will not be shown publicly. Confirm your own age, even if this account is for a business, a
              pet, or something else.
            </Text>
          </Stack>
          <DateInput name="dob" label="Date of birth" maxDate={new Date()} />
        </Stack>
      </Stack>
      <Stack py={6} px={8} position="fixed" bottom={0} left={0} w="100%">
        <Text color="gray.400" fontSize="xs">
          By signing up, you agree to our Terms, Privacy Policy and Cookie Use. Twitter may use your contact
          information, including your email address and phone number for purposes outlined in our Privacy
          Policy. Learn more
        </Text>
        <Button
          type="submit"
          size="lg"
          w="100%"
          colorScheme="monochrome"
          isDisabled={!form.formState.isValid}
          isLoading={verifyLoading}
        >
          Next
        </Button>
      </Stack>
    </Form>
  )
}
