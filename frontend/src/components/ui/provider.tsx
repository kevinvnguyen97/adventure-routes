"use client";

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "@components/ui/color-mode";
import { autocompleteCss } from "@constants/google";

const system = createSystem(defaultConfig, {
  globalCss: {
    body: {
      bgColor: { _light: "orange", _dark: "black" },
      padding: 5,
    },
    ...autocompleteCss,
  },
});

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
