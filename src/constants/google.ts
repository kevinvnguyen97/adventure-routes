import type { SystemStyleObject } from "@chakra-ui/react";
import type { Libraries } from "@react-google-maps/api";

export const autocompleteCss: Record<string, SystemStyleObject> = {
  // Entire container for the autocomplete dropdown
  ".pac-container": {
    zIndex: "100000 !important",
    bgColor: {
      _light: "whiteAlpha.950/60 !important",
      _dark: "gray.800/60 !important",
    },
    color: { _dark: "white !important" },
    backdropFilter: "blur(5px)",
    fontFamily: "Inter, sans-serif !important",
    transition: "0.25s ease !important",
    marginTop: "8px !important",
    outline: {
      _light: "0 !important",
      _dark: "1px var(--global-color-border) solid !important",
    },
    border: "0 !important",
    borderRadius: "var(--chakra-radii-l2) !important",
  },
  // Individual items in the autocomplete dropdown
  ".pac-item": {
    color: { _dark: "white !important" },
    height: "32px !important",
    border: "0 !important",
    fontSize: "14px !important",
    padding: "6px 8px 35px !important",
  },
  // Hover state for individual items
  ".pac-item:hover": {
    bgColor: { _dark: "var(--global-color-border) !important" },
  },
  ".pac-item-selected": {
    bgColor: { _dark: "var(--global-color-border) !important" },
  },
  // Powered by Google logo container
  ".hdpi.pac-logo:after": {
    bgColor: { _dark: "var(--global-color-border) !important" },
    display: "none !important",
  },
  // Query input field in the autocomplete dropdown
  ".pac-item-query": {
    color: { _dark: "white !important" },
    fontFamily: "Inter, sans-serif !important",
    fontSize: "14px !important",
  },
};

export const googleLibraries: Libraries = ["places"];

const Colors = {
  MUTCD_GREEN: "#006B54",
  BLUE: "#0000FF",
  RED: "#FF0000",
  MUTCD_BROWN: "#660000",
} as const;

export const RouteColors = [
  Colors.MUTCD_GREEN,
  Colors.BLUE,
  Colors.RED,
  Colors.MUTCD_BROWN,
];
