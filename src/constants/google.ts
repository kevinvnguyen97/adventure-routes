import type { SystemStyleObject } from "@chakra-ui/react";
import type { Libraries } from "@react-google-maps/api";

export const autocompleteCss: Record<string, SystemStyleObject> = {
  ".pac-container": {
    zIndex: "100000 !important",
    backgroundColor: { _dark: "var(--chakra-colors-bg-panel) !important" },
    color: { _dark: "white !important" },
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
  ".pac-item": {
    color: { _dark: "white !important" },
    height: "32px !important",
    border: "0 !important",
    fontSize: "14px !important",
    padding: "6px 8px !important",
  },
  ".pac-item:hover": {
    bgColor: { _dark: "white !important" },
  },
  ".hdpi.pac-logo:after": {
    bgColor: { _dark: "var(--global-color-border) !important" },
  },
  ".pac-item-query": {
    color: { _dark: "white !important" },
    fontFamily: "Inter, sans-serif !important",
    fontSize: "14px !important",
  },
};

export const googleLibraries: Libraries = ["places"];
