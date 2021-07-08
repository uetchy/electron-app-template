import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    config: { initialColorMode: "dark", useSystemColorMode: false },
    styles: {
      global: {
        "html, body": {
          background: "#212325",
        },
      },
    },
    components: {
      Button: { baseStyle: { _focus: { boxShadow: "none" } } },
      ModalCloseButton: { baseStyle: { _focus: { boxShadow: "none" } } },
    },
    colors: {
      brand: {
        900: "#212325",
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "purple" })
);
