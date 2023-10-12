import { extendTheme, StyleFunctionProps } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

import { colors } from "./colors"
import { Button } from "./components/Button"
import { Input } from "./components/Input"
import { Link } from "./components/Link"
import { Select } from "./components/Select"
import { Textarea } from "./components/Textarea"

export const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
  fonts: {
    body: "Poppins, sans-serif",
    heading: "Poppins, serif",
  },
  colors,
  components: {
    Button,
    Input,
    Select,
    Textarea,
    Link,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode("white", "brand.bgDark")(props),
      },
    }),
  },
})
