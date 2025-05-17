import React, { useState, MouseEvent } from "react";

import { InfoOutlined, Directions, Comment } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { RouteCard } from "/imports/ui/components/RouteCard";
import { AdventureRoute } from "/imports/api/adventureRoutes";
import {
  formatDuration,
  formatImperialDistance,
  getTotalDistance,
  getTotalDuration,
} from "/imports/util";
import { RouteDirectionLeg } from "./RouteDirectionLeg";

const BUTTON_STYLE: SxProps<Theme> = {
  textTransform: "none",
  bgcolor: "white",
  "&:hover": {
    bgcolor: "whitesmoke",
  },
  borderRadius: "2px",
  padding: "4px 17px",
  fontSize: "18px",
  fontFamily: "Roboto, Arial, sans-serif",
  fontWeight: "normal",
  height: 40,
};

type CustomMapInfoProps = {
  adventureRoute: AdventureRoute;
  directions: google.maps.DirectionsResult;
  travelMode: google.maps.TravelMode;
  setTravelMode: (travelMode: google.maps.TravelMode) => void;
};
export const CustomMapInfo = (props: CustomMapInfoProps) => {
  const { adventureRoute, directions, travelMode, setTravelMode } = props;

  const { routes } = directions || {};
  const route = routes?.[0];
  const { legs } = route || {};
  const totalDistance = getTotalDistance(legs);
  const totalDuration = getTotalDuration(legs);
  const formattedDistance = formatImperialDistance(totalDistance);
  const formattedDuration = formatDuration(totalDuration);

  const [infoAnchorElement, setInfoAnchorElement] =
    useState<HTMLButtonElement | null>(null);
  const [directionsAnchorElement, setDirectionsAnchorElement] =
    useState<HTMLButtonElement | null>(null);

  const isInfoPopoverOpen = Boolean(infoAnchorElement);
  const isDirectionsPopoverOpen = Boolean(directionsAnchorElement);
  const infoPopoverId = isInfoPopoverOpen ? "info-popover" : undefined;
  const directionsPopoverId = isDirectionsPopoverOpen
    ? "directions-popover"
    : undefined;

  const handleInfoClick = (event: MouseEvent<HTMLButtonElement>) => {
    setInfoAnchorElement(event.currentTarget);
  };
  const handleInfoClose = () => {
    setInfoAnchorElement(null);
  };
  const handleDirectionsClick = (event: MouseEvent<HTMLButtonElement>) => {
    setDirectionsAnchorElement(event.currentTarget);
  };
  const handleDirectionsClose = () => {
    setDirectionsAnchorElement(null);
  };

  return (
    <Box position="absolute" zIndex={1} top={10} left={178}>
      <Button
        variant="contained"
        sx={BUTTON_STYLE}
        aria-describedby={infoPopoverId}
        onClick={handleInfoClick}
      >
        <InfoOutlined />
      </Button>
      <Popover
        id={infoPopoverId}
        open={isInfoPopoverOpen}
        anchorEl={infoAnchorElement}
        onClose={handleInfoClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        marginThreshold={-100}
      >
        <RouteCard adventureRoute={adventureRoute!} isInMap />
      </Popover>
      <Button
        variant="contained"
        sx={BUTTON_STYLE}
        onClick={handleDirectionsClick}
      >
        <Directions />
      </Button>
      <Popover
        id={directionsPopoverId}
        open={isDirectionsPopoverOpen}
        anchorEl={directionsAnchorElement}
        onClose={handleDirectionsClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        marginThreshold={-100}
      >
        <Box maxWidth={400} maxHeight={500}>
          <Box padding={2}>
            <Typography>Total Distance: {formattedDistance}</Typography>
            <Typography>Total Duration: {formattedDuration}</Typography>
            <FormControl variant="filled" fullWidth margin="normal">
              <InputLabel id="travel-mode">Travel Mode</InputLabel>
              <Select
                labelId="travel-mode"
                value={travelMode}
                onChange={(e) => setTravelMode(e.target.value)}
              >
                <MenuItem value={google.maps.TravelMode.DRIVING}>
                  Driving
                </MenuItem>
                <MenuItem value={google.maps.TravelMode.BICYCLING}>
                  Bicycling
                </MenuItem>
                <MenuItem value={google.maps.TravelMode.WALKING}>
                  Walking
                </MenuItem>
                <MenuItem value={google.maps.TravelMode.TRANSIT}>
                  Transit
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          {legs?.map((leg, i) => {
            return <RouteDirectionLeg key={i} leg={leg} legKey={i} />;
          })}
        </Box>
      </Popover>
      <Button variant="contained" sx={BUTTON_STYLE} aria-describedby="">
        <Comment />
      </Button>
    </Box>
  );
};
