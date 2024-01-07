import * as React from "react"
import { gql } from "@apollo/client"
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import { X } from "lucide-react"
import NextLink from "next/link"

import { REPORT_ISSUE_TYPES } from "lib/static/reportIssueTypes"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"

import type { ReportType } from "../../../database/src"
import { Modal } from "./Modal"

const _ = gql`
  mutation CreateReport($data: CreateReportInput!) {
    createReport(data: $data)
  }
`

interface Props {
  type?: ReportType
  setType: React.Dispatch<React.SetStateAction<ReportType | undefined>>
  handleSubmit: () => void
}

export function ReportFlow({ type, setType, handleSubmit }: Props) {
  const modalProps = useDisclosure()
  const [step, setStep] = React.useState(1)

  const borderColor = useColorModeValue("gray.100", "gray.700")
  const headerBgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)
  const footerBgColor = useColorModeValue("white", "brand.bgDark")
  return (
    <Box>
      <Flex
        w="100%"
        maxW="100vw"
        h="56px"
        position="fixed"
        backdropFilter="blur(10px)"
        bgColor={headerBgColor}
        zIndex={1}
        align="center"
        borderBottom="1px solid"
        borderColor={borderColor}
      >
        <NextLink href="/home">
          <IconButton aria-label="back" icon={<Box as={X} boxSize="20px" />} variant="ghost" m={2} />
        </NextLink>
        <Heading as="h1" size="md">
          {step === 1 ? "Gathering info" : "Confirmation"}
        </Heading>
      </Flex>
      <Box pt="56px" pb="96px">
        <Stack px={8} py={6} spacing={8}>
          {step === 1 ? (
            <>
              <Stack>
                <Heading as="h2" fontSize="2xl">
                  What type of issue are you reporting?
                </Heading>
                <Link fontSize="sm" onClick={modalProps.onOpen}>
                  Why are we asking this?
                </Link>
              </Stack>
              <RadioGroup onChange={(e) => setType(e as ReportType)}>
                <Stack spacing={6}>
                  {REPORT_ISSUE_TYPES.map(({ value, title, text }) => (
                    <HStack key={value} align="flex-start">
                      <FormLabel htmlFor={value} cursor="pointer">
                        <Stack spacing={0}>
                          <Text fontWeight="bold">{title}</Text>
                          <Text color="gray.400" fontSize="sm">
                            {text}
                          </Text>
                        </Stack>
                      </FormLabel>
                      <Radio id={value} value={value} />
                    </HStack>
                  ))}
                </Stack>
              </RadioGroup>
            </>
          ) : (
            <Stack justify="space-between" minH="45vh">
              <Stack>
                <Heading as="h2" fontSize="2xl">
                  It sounds like you want to make report for{" "}
                  <Text as="span" color="blue.500">
                    {REPORT_ISSUE_TYPES.find((t) => t.value === type)?.title}
                  </Text>
                </Heading>
                <Text color="gray.400">{REPORT_ISSUE_TYPES.find((t) => t.value === type)?.text}</Text>
              </Stack>
              <Text fontWeight="bold" fontSize="2xl">
                Is that right?
              </Text>
            </Stack>
          )}
        </Stack>
        <Box position="fixed" bottom={0} w="100%" px={8} py={6} bg={footerBgColor}>
          {step === 1 ? (
            <Button
              colorScheme="monochrome"
              size="lg"
              w="100%"
              isDisabled={!!!type}
              onClick={() => setStep(2)}
            >
              Next
            </Button>
          ) : (
            <Stack spacing={4}>
              <Button size="lg" onClick={handleSubmit}>
                Yes, submit report
              </Button>
              <Button size="lg" colorScheme="monochrome" onClick={() => setStep(1)}>
                No, select another rule
              </Button>
            </Stack>
          )}
        </Box>
      </Box>
      {/* WHY ASKING MODAL */}
      <Modal {...modalProps} title="Why are we asking this?">
        <Stack spacing={6}>
          <Text>
            Rather than having you figure out what rule someone violated, we want to know what you're
            experiencing or seeing. This helps us figure out what's going on here and resolve the issue more
            quickly and accurately.
          </Text>
          <Button colorScheme="monochrome" onClick={modalProps.onClose}>
            Got it
          </Button>
        </Stack>
      </Modal>
    </Box>
  )
}
