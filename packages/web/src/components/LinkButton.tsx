import * as React from "react"
import type { ButtonProps } from "@chakra-ui/react"
import { Button, Link } from "@chakra-ui/react"
import NextLink from "next/link"

interface Props extends ButtonProps {
  href: string
}
export const LinkButton: React.FC<Props> = ({ href, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <Button as={Link} textDecor="none !important" {...props}>
        {props.children}
      </Button>
    </NextLink>
  )
}
