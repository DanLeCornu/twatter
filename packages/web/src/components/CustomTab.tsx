import type { LinkProps } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { Link, useColorModeValue } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

interface Props extends LinkProps {
  href: string
  isActive?: boolean
}
export function CustomTab({ href, isActive, ...props }: Props) {
  const { asPath } = useRouter()
  const active = isActive || href === asPath

  const activeColor = useColorModeValue("black", "white")
  const inactiveColor = useColorModeValue("gray.600", "gray.500")
  return (
    <Link
      as={NextLink}
      href={href}
      p={4}
      pb={0}
      textAlign="center"
      textDecoration="none !important"
      fontWeight="medium"
      fontSize="sm"
      _hover={{ color: useColorModeValue("black", "white") }}
    >
      <Box
        color={active ? activeColor : inactiveColor}
        borderBottom="3.5px solid"
        borderColor={active ? "brand.blue" : "transparent"}
        pb={2}
        px={1}
      >
        {props.children}
      </Box>
    </Link>
  )
}
