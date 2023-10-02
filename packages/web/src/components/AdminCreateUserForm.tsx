import * as React from "react"
import { gql } from "@apollo/client"
import { Button, Stack } from "@chakra-ui/react"
import { useRouter } from "next/router"

import { useAdminCreateUserMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import yup from "lib/yup"

import { ButtonGroup } from "./ButtonGroup"
import { Form } from "./Form"
import { FormError } from "./FormError"
import { Input } from "./Input"

const _ = gql`
  mutation AdminCreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      id
    }
  }
`

interface Props {
  onClose: () => void
}

const UserSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  handle: yup.string().required(),
})

export function AdminCreateUserForm(props: Props) {
  const router = useRouter()
  const [createUser] = useAdminCreateUserMutation()
  const defaultValues = {
    email: "",
    firstName: "",
    lastName: "",
  }
  const form = useForm({ defaultValues, schema: UserSchema })
  const handleSubmit = (data: yup.InferType<typeof UserSchema>) => {
    return form.handler(() => createUser({ variables: { data: { ...data, password: "-----------" } } }), {
      onSuccess: (res, toast) => {
        router.push("/admin/users/" + res.createUser.id)
        toast({ description: "User created" })
      },
    })
  }
  return (
    <Form {...form} onSubmit={handleSubmit}>
      <Stack>
        <Input name="name" label="Name" />
        <Input name="handle" label="Handle" />
        <Input name="email" label="Email" />
        <FormError />
        <ButtonGroup>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button colorScheme="blue" type="submit" isLoading={form.formState.isSubmitting}>
            Create
          </Button>
        </ButtonGroup>
      </Stack>
    </Form>
  )
}
