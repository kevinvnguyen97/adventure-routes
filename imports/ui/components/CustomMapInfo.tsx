import React, { useState, MouseEvent, FormEvent } from "react";
import { Meteor } from "meteor/meteor";
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
  TextField,
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
  meteorMethodPromise,
} from "/imports/util";
import { RouteDirectionLeg } from "/imports/ui/components/RouteDirectionLeg";
import { useCommentsForAdventureRoute } from "/imports/providers/adventureRoutes";
import { CommentCard } from "/imports/ui/components/CommentCard";
import { useAlertSnackbar } from "/imports/providers/AlertSnackbarProvider";

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

  const [commentText, setCommentText] = useState("");

  const userId = Meteor.userId() ?? "";
  const { data: comments, isLoading: isCommentsLoading } =
    useCommentsForAdventureRoute(adventureRoute._id);
  const { routes } = directions || {};
  const route = routes?.[0];
  const { legs } = route || {};
  const totalDistance = getTotalDistance(legs);
  const totalDuration = getTotalDuration(legs);
  const formattedDistance = formatImperialDistance(totalDistance);
  const formattedDuration = formatDuration(totalDuration);
  const { setSnackbar } = useAlertSnackbar();

  const [infoAnchorElement, setInfoAnchorElement] =
    useState<HTMLButtonElement | null>(null);
  const [directionsAnchorElement, setDirectionsAnchorElement] =
    useState<HTMLButtonElement | null>(null);
  const [commentsAnchorElement, setCommentsAnchorElement] =
    useState<HTMLButtonElement | null>(null);

  const isInfoPopoverOpen = Boolean(infoAnchorElement);
  const isDirectionsPopoverOpen = Boolean(directionsAnchorElement);
  const isCommentsPopoverOpen = Boolean(commentsAnchorElement);
  const infoPopoverId = isInfoPopoverOpen ? "info-popover" : undefined;
  const directionsPopoverId = isDirectionsPopoverOpen
    ? "directions-popover"
    : undefined;
  const commentsPopoverId = isCommentsPopoverOpen
    ? "comments-popover"
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
  const handleCommentsClick = (event: MouseEvent<HTMLButtonElement>) => {
    setCommentsAnchorElement(event.currentTarget);
  };
  const handleCommentsClose = () => {
    setCommentsAnchorElement(null);
  };
  const onCommentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await meteorMethodPromise("upsertComment", {
        // @ts-ignore
        userId,
        adventureRouteId: adventureRoute._id,
        commentText,
        date: new Date(),
      });
      setSnackbar({
        isOpen: true,
        message: "Comment sent successfully",
        severity: "success",
      });
    } catch (error) {
      if (error instanceof Meteor.Error) {
        setSnackbar({
          isOpen: true,
          message: error.message,
          severity: "error",
        });
      }
    }
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
      <Button
        variant="contained"
        sx={BUTTON_STYLE}
        aria-describedby={commentsPopoverId}
        onClick={handleCommentsClick}
      >
        <Comment />
      </Button>
      <Popover
        id={commentsPopoverId}
        open={isCommentsPopoverOpen}
        anchorEl={commentsAnchorElement}
        onClose={handleCommentsClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        marginThreshold={-100}
      >
        <Box
          padding={2}
          display="flex"
          flexDirection="column"
          gap={2}
          maxWidth={400}
          maxHeight={500}
        >
          <Typography variant="h5">Comments</Typography>
          <Box component="form" display="flex" onSubmit={onCommentSubmit}>
            <TextField
              label="Add comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={!commentText}
            >
              Send
            </Button>
          </Box>
          {!isCommentsLoading &&
            comments.map((comment) => (
              <CommentCard key={comment._id} comment={comment} />
            ))}
        </Box>
      </Popover>
    </Box>
  );
};
