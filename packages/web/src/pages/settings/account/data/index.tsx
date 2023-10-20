import { BiArrowBack, BiChevronRight } from "react-icons/bi"
import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import dayjs from "dayjs"
import Head from "next/head"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { useMe } from "lib/hooks/useMe"
import { BG_DARK_RGB, WHITE_RGB } from "lib/theme/colors"
import { withAuth } from "components/hoc/withAuth"
import { HEADING_CONTAINER_HEIGHT, HomeLayout } from "components/HomeLayout"

function AccountDataSettings() {
  const { me, loading } = useMe()
  const router = useRouter()

  const LIST_ITEMS = [
    {
      title: "Username",
      subTitle: `@${me?.handle}`,
      path: "/settings/account/data/username",
    },
    {
      title: "Email",
      subTitle: me?.email,
      path: "/settings/account/data/email",
    },
    {
      title: "Account creation",
      subTitle: dayjs(me?.createdAt).format("MMM DD, YYYY, h:mm:ss A"),
    },
    {
      title: "Birth date",
      subTitle: (
        <>
          <Text>{dayjs(me?.dob).format("MMM DD, YYYY")}</Text>
          <Text>
            Add your date of birth to your{" "}
            <NextLink href={`/${me?.handle}`}>
              <Link>profile</Link>
            </NextLink>
          </Text>
        </>
      ),
    },
  ]

  const bgColor = useColorModeValue(`rgba(${WHITE_RGB}, 0.85)`, `rgba(${BG_DARK_RGB}, 0.80)`)

  if (loading)
    return (
      <Center>
        <Spinner />
      </Center>
    )
  if (!me) return null
  return (
    <Box>
      <Head>
        <title>Settings / Twatter</title>
      </Head>
      <HStack
        position="fixed"
        top={0}
        left={0}
        w="100%"
        h={HEADING_CONTAINER_HEIGHT + "px"}
        zIndex={1}
        p={2}
        backdropFilter="blur(10px)"
        bgColor={bgColor}
      >
        <IconButton
          aria-label="back"
          icon={<Box as={BiArrowBack} boxSize="20px" />}
          variant="ghost"
          onClick={() => router.back()}
        />

        <Stack spacing={0}>
          <Heading fontSize="md">Account information</Heading>
          <Text color="gray.400" fontSize="xs">
            @{me?.handle}
          </Text>
        </Stack>
      </HStack>
      <Stack mt={HEADING_CONTAINER_HEIGHT + "px"} py={2}>
        {LIST_ITEMS.map((listItem, i) => {
          return listItem.path ? (
            <NextLink key={i} href={listItem.path}>
              <HStack justify="space-between" px={4} py={2}>
                <Stack spacing={0}>
                  <Text color="gray.200" fontSize="sm">
                    {listItem.title}
                  </Text>
                  <Text color="gray.400" fontSize="xs">
                    {listItem.subTitle}
                  </Text>
                </Stack>
                <Icon as={BiChevronRight} boxSize="24px" color="gray.400" />
              </HStack>
            </NextLink>
          ) : (
            <HStack justify="space-between" px={4} py={2}>
              <Stack spacing={0}>
                <Text color="gray.200" fontSize="sm">
                  {listItem.title}
                </Text>
                <Text color="gray.400" fontSize="xs">
                  {listItem.subTitle}
                </Text>
              </Stack>
            </HStack>
          )
        })}
      </Stack>
    </Box>
  )
}

AccountDataSettings.getLayout = (page: React.ReactNode) => (
  <HomeLayout showCreateButton={false}>{page}</HomeLayout>
)

export default withAuth(AccountDataSettings)
