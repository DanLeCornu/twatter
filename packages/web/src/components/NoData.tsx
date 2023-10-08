import * as React from "react"
import { FiAlertTriangle } from "react-icons/fi"
import type { FlexProps} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react"
import { Box, HStack, Text } from "@chakra-ui/react"

interface Props extends FlexProps {
  children: React.ReactNode
}
export function NoData(props: Props) {
  const borderColor = useColorModeValue("gray.100", "gray.700")
  return (
    <HStack
      p={3}
      px={4}
      border="1px solid"
      borderColor={borderColor}
      borderRadius={5}
      spacing={4}
      align="center"
    >
      <Box as={FiAlertTriangle} color="gray.500" />
      <Text color="gray.500">{props.children}</Text>
    </HStack>
  )
}
