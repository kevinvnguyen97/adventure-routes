export const Colors = {
  MUTCD_GREEN: "#006B54",
  BLUE: "#0000FF",
  RED: "#FF0000",
  MUTCD_BROWN: "#660000",
  ORANGE: "#FFA500",
  DARK_ORANGE: "#F97316",
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  ALMOST_BLACK: "#212225",
  ALMOST_BLACK_II: "#2E3135",
} as const;

export const ColorTheme = {
  light: {
    text: Colors.WHITE,
    fieldText: Colors.BLACK,
    fieldTextBackground: Colors.WHITE,
    background: Colors.ORANGE,
    backgroundElement: Colors.DARK_ORANGE,
    backgroundSelected: "#E0E1E6",
    textSecondary: "#60646C",
  },
  dark: {
    text: Colors.WHITE,
    fieldText: Colors.WHITE,
    fieldTextBackground: Colors.ALMOST_BLACK,
    background: Colors.BLACK,
    backgroundElement: Colors.ALMOST_BLACK,
    backgroundSelected: Colors.ALMOST_BLACK_II,
    textSecondary: "#B0B4BA",
  },
} as const;

export const RouteColors = [
  Colors.MUTCD_GREEN,
  Colors.BLUE,
  Colors.RED,
  Colors.MUTCD_BROWN,
];
