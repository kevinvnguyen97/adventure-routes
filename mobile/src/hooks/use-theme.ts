/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { ColorTheme } from "@shared/constants/color";
import { useColorScheme } from "@/hooks/use-color-scheme";

export function useTheme() {
  const scheme = useColorScheme();
  const theme = scheme === "unspecified" ? "light" : scheme;

  return ColorTheme[theme];
}
