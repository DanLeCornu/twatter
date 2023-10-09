import * as React from "react"
import { gql } from "@apollo/client"
import { Button, Heading, Stack, Text } from "@chakra-ui/react"

import { MeDocument, useUpdatePasswordMutation } from "lib/graphql"
import { suggestHandle } from "lib/helpers/suggestHandle"
import { useForm } from "lib/hooks/useForm"
import yup from "lib/yup"

import { Form } from "./Form"
import { Input } from "./Input"

const _ = gql`
  mutation UpdateHandle($data: UpdateUserInput!) {
    updateMe(data: $data) {
      id
    }
  }
`
const Onboarding1Schema = yup.object().shape({
  handle: yup.string().min(3, "Minimum 3 characters").max(15, "Maximum 15 characters").required("Required"),
})

interface Props {
  name: string
  handle?: string | null
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export function OnboardingStep1({ name, handle, setStep }: Props) {
  const defaultValues = {
    handle: handle || suggestHandle(name),
  }
  const form = useForm({ schema: Onboarding1Schema, defaultValues })

  const [update, { loading }] = useUpdatePasswordMutation({ refetchQueries: [{ query: MeDocument }] })

  const onSubmit = (data: yup.InferType<typeof Onboarding1Schema>) => {
    return form.handler(() => update({ variables: { data: { handle: data.handle } } }), {
      onSuccess: async () => {
        setStep(4)
      },
    })
  }
  return (
    <Form onSubmit={onSubmit} {...form}>
      <Stack spacing={6}>
        <Stack spacing={1}>
          <Heading as="h1" fontSize="2xl" pt={8}>
            What should we call you?
          </Heading>
          <Text color="gray.400" fontSize="sm">
            You @username is unique. You can always change it later
          </Text>
        </Stack>
        <Input name="handle" label="Username" autoFocus />
      </Stack>
      <Stack py={6} px={8} position="fixed" bottom={0} left={0} w="100%">
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
