import type { LinkProps } from "@chakra-ui/react"
import { Link, useColorModeValue } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

interface Props extends LinkProps {
  href: string
}
export function ProfileTab({ href, ...props }: Props) {
  const { asPath } = useRouter()
  const isActive = href === asPath

  const activeColor = useColorModeValue("black", "white")
  const inactiveColor = useColorModeValue("gray.600", "gray.500")
  return (
    <Link
      as={NextLink}
      href={href}
      p={4}
      pb={3}
      textAlign="center"
      textDecoration="none !important"
      color={isActive ? activeColor : inactiveColor}
      borderBottom="2px solid"
      borderColor={isActive ? "primary.500" : "transparent"}
      fontWeight="medium"
      _hover={{ color: useColorModeValue("black", "white") }}
    >
      {props.children}
    </Link>
  )
}
