import * as React from "react"
import { gql } from "@apollo/client"
import { Button, Heading, Stack, Text } from "@chakra-ui/react"

import { useUpdatePasswordOnboardingMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import yup from "lib/yup"

import { Form } from "./Form"
import { Input } from "./Input"

const _ = gql`
  mutation UpdatePasswordOnboarding($data: UpdateUserInput!) {
    updateMe(data: $data) {
      id
    }
  }
`
const Onboarding2Schema = yup.object().shape({
  password: yup.string().min(8, "Must be at least 8 characters"),
})

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export function OnboardingStep2({ setStep }: Props) {
  const form = useForm({ schema: Onboarding2Schema })

  const [update, { loading }] = useUpdatePasswordOnboardingMutation()

  const onSubmit = (data: yup.InferType<typeof Onboarding2Schema>) => {
    return form.handler(() => update({ variables: { data: { password: data.password } } }), {
      onSuccess: async () => {
        setStep(5)
      },
    })
  }
  return (
    <Form onSubmit={onSubmit} {...form}>
      <Stack spacing={6}>
        <Stack spacing={1}>
          <Heading as="h1" fontSize="2xl" pt={8}>
            You'll need a password
          </Heading>
          <Text color="gray.400" fontSize="sm">
            Make sure it's 8 characters or more.
          </Text>
        </Stack>
        <Input name="password" label="Password" autoFocus />
      </Stack>
      <Stack pb={3} px={8} position="fixed" bottom={0} left={0} w="100%">
        <Button
          type="submit"
          size="lg"
          w="100%"
          colorScheme="monochrome"
          isDisabled={!form.formState.isValid}
          isLoading={loading}
        >
          Next
        </Button>
      </Stack>
    </Form>
  )
}
