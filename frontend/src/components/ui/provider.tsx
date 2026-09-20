"use client";

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "@components/ui/color-mode";
import { autocompleteCss } from "@constants/google";
import { Colors, ColorTheme } from "@shared/constants/color";

const customConfig = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        text: {
          DEFAULT: {
            value: {
              _light: ColorTheme.light.text,
              _dark: ColorTheme.dark.text,
            },
          },
        },
        fieldText: {
          DEFAULT: {
            value: {
              _light: ColorTheme.light.fieldText,
              _dark: ColorTheme.dark.fieldText,
            },
          },
        },
      },
    },
  },
  globalCss: {
    body: {
      bgColor: { _light: Colors.ORANGE, _dark: Colors.BLACK },
      padding: 5,
    },
    ...autocompleteCss,
  },
});

const system = createSystem(defaultConfig, customConfig);

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
