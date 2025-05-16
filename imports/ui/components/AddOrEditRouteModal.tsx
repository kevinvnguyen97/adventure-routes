import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Close, Add, Remove } from "@mui/icons-material";
import { Autocomplete } from "@react-google-maps/api";
import { Meteor } from "meteor/meteor";
import { useAlertSnackbar } from "/imports/providers/AlertSnackbarProvider";
import { meteorMethodPromise } from "/imports/util";
import { AdventureRoute } from "/imports/api/adventureRoutes";

type AddOrEditRouteModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export const AddOrEditRouteModal = (props: AddOrEditRouteModalProps) => {
  const { isOpen, onClose } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [priceCategory, setPriceCategory] = useState(0);
  const [activities, setActivities] = useState<string[]>([]);
  const [origin, setOrigin] = useState("");
  const [waypoints, setWaypoints] = useState<string[]>([""]);
  const [destination, setDestination] = useState("");

  const [originAutoComplete, setOriginAutoComplete] =
    useState<google.maps.places.Autocomplete>();
  const [destinationAutoComplete, setDestinationAutoComplete] =
    useState<google.maps.places.Autocomplete>();
  const [waypointsAutoComplete, setWaypointsAutoComplete] = useState<
    google.maps.places.Autocomplete[]
  >([]);

  const { setSnackbar } = useAlertSnackbar();
  const userId = Meteor.userId() || "";

  const onAutoCompleteLoad = (
    autocomplete: google.maps.places.Autocomplete,
    placeType: string
  ) => {
    switch (placeType) {
      case "origin":
        setOriginAutoComplete(autocomplete);
        break;
      case "destination":
        setDestinationAutoComplete(autocomplete);
        break;
      default:
        setWaypointsAutoComplete((prev) => [...prev, autocomplete]);
        break;
    }
  };
  const onPlaceChanged = (placeType: string, waypointIndex?: number) => {
    switch (placeType) {
      case "origin":
        const originAddress = originAutoComplete?.getPlace().formatted_address;
        if (originAddress) {
          setOrigin(originAddress);
        }
        break;
      case "destination":
        const destinationAddress =
          destinationAutoComplete?.getPlace().formatted_address;
        if (destinationAddress) {
          setDestination(destinationAddress);
        }
        break;
      default:
        const waypointAddress =
          waypointsAutoComplete[waypointIndex!]?.getPlace().formatted_address;
        if (waypointAddress) {
          const formattedWaypoints = waypoints.map((waypoint, i) =>
            i === waypointIndex ? waypointAddress : waypoint
          );
          setWaypoints(formattedWaypoints);
        }
    }
  };
  const updateWaypoint = (newWaypoint: string, index: number) => {
    const updatedWaypoints = waypoints.map((waypoint, i) =>
      i === index ? newWaypoint : waypoint
    );
    setWaypoints(updatedWaypoints);
  };
  const removeWaypoint = (index: number) => {
    const updatedWaypoints = waypoints.filter((_, i) => i !== index);
    setWaypoints(updatedWaypoints);
    const updatedWaypointsAutoComplete = waypointsAutoComplete.filter(
      (_, waypointIndexToRemove) => index !== waypointIndexToRemove
    );
    setWaypointsAutoComplete(updatedWaypointsAutoComplete);
  };
  const toggleIsPublic = () => {
    setIsPublic((prev) => !prev);
  };
  const onRouteSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitting route data...");
    const routeData: AdventureRoute = {
      userId,
      name,
      isPublic,
      description,
      priceCategory,
      activities,
      route: {
        origin,
        waypoints: waypoints.length > 0 ? waypoints : undefined,
        destination,
      },
    };
    try {
      await meteorMethodPromise("upsertAdventureRoute", routeData);
      setSnackbar({
        isOpen: true,
        message: "Route saved successfully",
        severity: "success",
      });
    } catch (error) {
      if (error instanceof Meteor.Error) {
        console.error("Error:", error);
        setSnackbar({
          isOpen: true,
          message: error.message,
          severity: "error",
        });
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: onRouteSubmit,
        },
      }}
    >
      <DialogTitle>Add Or Edit Modal</DialogTitle>
      <IconButton
        onClick={onClose}
        style={{ position: "absolute", right: 8, top: 8 }}
      >
        <Close />
      </IconButton>
      <DialogContent>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="filled"
          type="text"
          label="Route Name"
          margin="normal"
          fullWidth
        />
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="filled"
          type="text"
          multiline
          label="Route Description"
          margin="normal"
          fullWidth
        />
        <FormControl variant="filled" fullWidth margin="normal">
          <ToggleButtonGroup
            color="primary"
            value={isPublic}
            onChange={toggleIsPublic}
            exclusive
            fullWidth
          >
            <ToggleButton value={false}>Private</ToggleButton>
            <ToggleButton value={true}>Public</ToggleButton>
          </ToggleButtonGroup>
        </FormControl>
        <FormControl variant="filled" fullWidth margin="normal">
          <InputLabel id="price-category">Price Category</InputLabel>
          <Select
            labelId="price-category"
            variant="filled"
            label="Price Category"
            value={priceCategory}
            onChange={(e) => setPriceCategory(e.target.value as number)}
          >
            <MenuItem value={0}>Free</MenuItem>
            <MenuItem value={1}>$</MenuItem>
            <MenuItem value={2}>$$</MenuItem>
            <MenuItem value={3}>$$$</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled" fullWidth margin="normal">
          <InputLabel id="activities">Activities</InputLabel>
          <Select
            labelId="activities"
            variant="filled"
            label="Activities"
            multiple
            value={activities}
            onChange={(e) => {
              const value = e.target.value as string[];
              setActivities(value);
            }}
            multiline
          >
            <MenuItem value="music">Music</MenuItem>
            <MenuItem value="food_drink">Food/Drink</MenuItem>
            <MenuItem value="sports">Sports</MenuItem>
            <MenuItem value="comedy">Comedy</MenuItem>
            <MenuItem value="movies">Movies</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled" fullWidth margin="normal">
          <Autocomplete
            onLoad={(autocomplete) =>
              onAutoCompleteLoad(autocomplete, "origin")
            }
            onPlaceChanged={() => onPlaceChanged("origin")}
          >
            <TextField
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              variant="filled"
              type="text"
              label="Origin"
              fullWidth
            />
          </Autocomplete>
        </FormControl>
        {waypoints.map((waypoint, index) => (
          <Box key={index} display="flex" alignItems="center">
            <FormControl variant="filled" fullWidth margin="normal">
              <Autocomplete
                onLoad={(autocomplete) =>
                  onAutoCompleteLoad(autocomplete, "waypoint")
                }
                onPlaceChanged={() => onPlaceChanged("waypoint", index)}
              >
                <TextField
                  value={waypoint}
                  onChange={(e) => updateWaypoint(e.target.value, index)}
                  variant="filled"
                  type="text"
                  label={`Waypoint ${index + 1}`}
                  fullWidth
                />
              </Autocomplete>
            </FormControl>
            {waypoints.length > 1 && (
              <Box>
                <IconButton onClick={() => removeWaypoint(index)}>
                  <Remove />
                </IconButton>
              </Box>
            )}
            {waypoints.length < 25 && (
              <Box>
                <IconButton onClick={() => setWaypoints([...waypoints, ""])}>
                  <Add />
                </IconButton>
              </Box>
            )}
          </Box>
        ))}
        <FormControl variant="filled" fullWidth margin="normal">
          <Autocomplete
            onLoad={(autocomplete) =>
              onAutoCompleteLoad(autocomplete, "destination")
            }
            onPlaceChanged={() => onPlaceChanged("destination")}
          >
            <TextField
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              variant="filled"
              type="text"
              label="Destination"
              fullWidth
            />
          </Autocomplete>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button type="submit" color="primary" variant="contained">
          Save Route
        </Button>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
