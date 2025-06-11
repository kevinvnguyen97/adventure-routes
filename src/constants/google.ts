import type { SystemStyleObject } from "@chakra-ui/react";
import type { Libraries } from "@react-google-maps/api";

export const autocompleteCss: Record<string, SystemStyleObject> = {
  // Entire container for the autocomplete dropdown
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

export const darkGoogleMapCss: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#242f3e" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#777777" }],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [{ color: "#777777" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

export const googleLibraries: Libraries = ["places"];
