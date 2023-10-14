import type { SystemStyleFunction } from "@chakra-ui/theme-tools"
import { mode } from "@chakra-ui/theme-tools"

const variantSolid: SystemStyleFunction = (props) => {
  const { colorScheme } = props

  if (colorScheme === "monochrome") {
    return {
      color: mode("white", "black.500")(props),
      bg: mode("black.500", "white")(props),
      _hover: {
        bg: mode("black.400", "black.50")(props),
        _disabled: {
          bg: mode("black.500", "white")(props),
        },
      },
    }
  }

  if (colorScheme === "translucent") {
    return {
      color: "white",
      bg: "rgba(26, 32, 44, 0.80)",
      backdropFilter: "blur(3px)",
      _hover: {
        bg: "rgba(26, 32, 44, 0.70)",
      },
    }
  }

  return {
    color: "white",
    bg: "primary.500",
    _hover: {
      bg: "primary.700",
      _disabled: {
        bg: "primary.500",
      },
    },
  }
}

const variantOutline: SystemStyleFunction = (props) => {
  const { colorScheme } = props

  if (colorScheme === "monochrome") {
    return {
      borderColor: mode("gray.100", "gray.600")(props),
    }
  }

  return {
    borderColor: mode("gray.100", "gray.600")(props),
    color: "primary.500",
  }
}

export const Button = {
  baseStyle: {
    borderRadius: "full",
  },
  variants: {
    solid: variantSolid,
    outline: variantOutline,
  },
}
