"use client";

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

const SYSTEM = createSystem(defaultConfig, {
  globalCss: {
    body: {
      _light: {
        bgColor: "orange",
      },
      _dark: {
        bgColor: "black",
      },
      padding: 5,
    },
  },
});

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={SYSTEM}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
