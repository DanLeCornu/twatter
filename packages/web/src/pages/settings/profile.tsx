import * as React from "react"
import { BiArrowBack } from "react-icons/bi"
import { TbCameraPlus } from "react-icons/tb"
import { gql } from "@apollo/client"
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import dayjs from "dayjs"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { useUpdateProfileMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import { useMe } from "lib/hooks/useMe"
import { DOB_PRIVACY_OPTIONS } from "lib/static/dobPrivacyOptions"
import { UPLOAD_PATHS } from "lib/uploadPaths"
import yup from "lib/yup"
import { DateInput } from "components/DateInput"
import { Form } from "components/Form"
import { withAuth } from "components/hoc/withAuth"
import { ImageUploader } from "components/ImageUploader"
import { Input } from "components/Input"
import { Modal } from "components/Modal"
import { Select } from "components/Select"
import { Textarea } from "components/Textarea"

const _ = gql`
  fragment UserProfileForm on User {
    id
    avatar
    cover
    name
    bio
    location
    website
    dob
    dobDayMonthPrivacy
    dobYearPrivacy
  }
  mutation UpdateProfile($data: UpdateUserInput!) {
    updateMe(data: $data) {
      ...UserProfileForm
    }
  }
`

export const ProfileSchema = yup.object().shape({
  name: yup.string().required(),
  bio: yup.string().nullIfEmpty(),
  location: yup.string().nullIfEmpty(),
  website: yup.string().nullIfEmpty(),
  dob: yup.string().nullIfEmpty(),
})

function EditProfile() {
  const { me, loading } = useMe()
  const router = useRouter()
  const editModalProps = useDisclosure()
  const removeModalProps = useDisclosure()
  const confirmModalProps = useDisclosure()
  const discardModalProps = useDisclosure()

  const [update, { loading: updateLoading }] = useUpdateProfileMutation()

  const [isEditingDob, setIsEditingDob] = React.useState(false)

  const defaultValues = {
    name: me?.name || "",
    bio: me?.bio || "",
    location: me?.location || "",
    website: me?.website || "",
    dob: me?.dob || "",
    dobDayMonthPrivacy: me?.dobDayMonthPrivacy || "",
    dobYearPrivacy: me?.dobYearPrivacy || "",
  }

  const form = useForm({ schema: ProfileSchema, defaultValues })

  const handleSubmit = (data: yup.InferType<typeof ProfileSchema>) => {
    return form.handler(
      () =>
        update({
          variables: { data: { ...data, dob: data.dob ? dayjs(data.dob).format("YYYY-MM-DD") : undefined } },
        }),
      {
        onSuccess: () => {
          router.replace(`/${me?.handle}`)
        },
      },
    )
  }

  const handleRemoveDob = () => {
    return form.handler(() => update({ variables: { data: { dob: null } } }), {
      onSuccess: () => {
        form.setValue("dob", "")
        setIsEditingDob(false)
        removeModalProps.onClose()
      },
    })
  }

  const updateAvatar = (avatar: string | null) => {
    return form.handler(() => update({ variables: { data: { avatar } } }))
  }

  const updateCover = (cover: string | null) => {
    return form.handler(() => update({ variables: { data: { cover } } }))
  }

  const bgColor = useColorModeValue("rgba(255, 255, 255, 0.85)", "rgba(26, 32, 44, 0.80)")

  if (loading)
    return (
      <Center minH="80vh">
        <Spinner />
      </Center>
    )
  if (!me) return null

  return (
    <>
      <Form {...form} onSubmit={handleSubmit}>
        <Flex
          w="100%"
          maxW="100vw"
          h="56px"
          position="fixed"
          backdropFilter="blur(10px)"
          bgColor={bgColor}
          zIndex={1}
        >
          {form.formState.isDirty ? (
            <IconButton
              aria-label="back"
              icon={<Box as={BiArrowBack} boxSize="20px" />}
              variant="ghost"
              m={2}
              onClick={discardModalProps.onOpen}
            />
          ) : (
            <NextLink href={`/${me?.handle}`}>
              <IconButton
                aria-label="back"
                icon={<Box as={BiArrowBack} boxSize="20px" />}
                variant="ghost"
                m={2}
              />
            </NextLink>
          )}
          <HStack px={4} spacing={0} w="100%" justify="space-between">
            <Heading as="h1" size="md" noOfLines={1} maxW="80%">
              Edit profile
            </Heading>
            {form.getFieldState("dob").isDirty ? (
              <Button size="sm" colorScheme="monochrome" onClick={confirmModalProps.onOpen}>
                Save
              </Button>
            ) : (
              <Button size="sm" colorScheme="monochrome" type="submit" isLoading={updateLoading}>
                Save
              </Button>
            )}
          </HStack>
        </Flex>
        <Box position="relative" pt="56px">
          <Box
            w="100%"
            h="140px"
            position="absolute"
            bgImage={me.cover || ""}
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            bg={!me.cover ? "brand.bgDark" : undefined}
          >
            <ImageUploader
              dropzoneOptions={{ maxSize: 1000000 }}
              path={UPLOAD_PATHS.userCover(me.id)}
              onSubmit={updateCover}
              w="100%"
              h="100%"
            >
              <Center h="100%">
                <Flex rounded="full" bg="rgba(0, 0, 0, 0.5)" p={2}>
                  <Icon as={TbCameraPlus} boxSize="24px" />
                </Flex>
              </Center>
            </ImageUploader>
          </Box>
          <Stack px={4} pt="100px" spacing={6}>
            <ImageUploader
              dropzoneOptions={{ maxSize: 1000000 }}
              path={UPLOAD_PATHS.userAvatar(me.id)}
              onSubmit={updateAvatar}
            >
              <Avatar src={me?.avatar || undefined} boxSize="95px" />
              <Center position="absolute" top={0} left={0} w="100%" h="100%">
                <Flex rounded="full" bg="rgba(0, 0, 0, 0.5)" p={2}>
                  <Icon as={TbCameraPlus} boxSize="24px" />
                </Flex>
              </Center>
            </ImageUploader>
            <Input name="name" label="Name" maxLength={50} />
            <Textarea name="bio" label="Bio" maxLength={160} />
            <Input name="location" label="Location" maxLength={30} />
            <Input name="website" label="Website" maxLength={100} />

            {isEditingDob ? (
              <Stack pb={16} spacing={6}>
                <Stack spacing={0}>
                  <Text fontWeight="medium">
                    Birth date &#183;{" "}
                    <Link fontSize="sm" onClick={() => setIsEditingDob(false)}>
                      Cancel
                    </Link>
                  </Text>
                  <Text color="gray.400" fontSize="sm">
                    This should be the date of birth of the person using the account. Even if you're making an
                    account for your business, event, or cat.
                  </Text>
                </Stack>
                <DateInput name="dob" label="Birth date" />
                <Stack spacing={0}>
                  <Text fontWeight="medium">Who sees this?</Text>
                  <Text color="gray.400" fontSize="sm">
                    You can control who sees your birthday on Twatter
                  </Text>
                </Stack>
                <Select name="dobDayMonthPrivacy" label="Month and day" options={DOB_PRIVACY_OPTIONS} />
                <Select name="dobYearPrivacy" label="Year" options={DOB_PRIVACY_OPTIONS} />
                <Button variant="ghost" color="red.500" rounded="sm" onClick={removeModalProps.onOpen}>
                  Remove birth date
                </Button>
              </Stack>
            ) : (
              <Stack spacing={0}>
                <Text color="gray.400">
                  Birth date &#183; <Link onClick={editModalProps.onOpen}>Edit</Link>
                </Text>
                <Text fontSize="xl">
                  {me?.dob ? dayjs(me.dob).format("MMMM DD, YYYY") : "Add your date of birth"}
                </Text>
              </Stack>
            )}
          </Stack>
        </Box>
      </Form>
      {/* EDIT DOB MODAL */}
      <Modal {...editModalProps} title="Edit date of birth?">
        <Text mb={6} fontSize="sm" color="gray.400">
          This can only be changed a few times. Make sure you enter the age of the person using the account.
        </Text>
        <Stack>
          <Button
            colorScheme="monochrome"
            onClick={() => {
              setIsEditingDob(true)
              editModalProps.onClose()
            }}
          >
            Edit
          </Button>
          <Button colorScheme="monochrome" variant="outline" onClick={editModalProps.onClose}>
            Cancel
          </Button>
        </Stack>
      </Modal>
      {/* CONFIRM DOB MODAL */}
      <Modal {...confirmModalProps} title="Confirm date of birth?">
        <Text mb={6} fontSize="sm" color="gray.400">
          You are confirming that {dayjs(form.getValues("dob")).format("MMMM DD, YYYY")}, is accurate. If it's
          not, your account may be affected.
        </Text>
        <Stack>
          <Button
            colorScheme="monochrome"
            onClick={() => {
              form.handleSubmit(handleSubmit)()
              confirmModalProps.onClose()
            }}
          >
            Confirm
          </Button>
          <Button colorScheme="monochrome" variant="outline" onClick={confirmModalProps.onClose}>
            Cancel
          </Button>
        </Stack>
      </Modal>
      {/* REMOVE DOB MODAL */}
      <Modal {...removeModalProps} title="Remove birth date?">
        <Text mb={6} fontSize="sm" color="gray.400">
          This will remove it from your profile
        </Text>
        <Stack>
          <Button colorScheme="monochrome" onClick={handleRemoveDob}>
            Remove
          </Button>
          <Button colorScheme="monochrome" variant="outline" onClick={removeModalProps.onClose}>
            Cancel
          </Button>
        </Stack>
      </Modal>
      {/* DISCARD CHANGES MODAL */}
      <Modal {...discardModalProps} title="Discard changes?">
        <Text mb={6} fontSize="sm" color="gray.400">
          This can't be undone and you'll lose your changes
        </Text>
        <Stack>
          <NextLink href={`/${me?.handle}`}>
            <Button w="100%" bg="red" _hover={{ bg: "red" }}>
              Discard
            </Button>
          </NextLink>
          <Button colorScheme="monochrome" variant="outline" onClick={discardModalProps.onClose}>
            Cancel
          </Button>
        </Stack>
      </Modal>
    </>
  )
}

export default withAuth(EditProfile)
