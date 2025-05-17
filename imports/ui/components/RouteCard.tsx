import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { AdventureRoute } from "/imports/api/adventureRoutes";
import {
  Edit,
  Map,
  LocationPin,
  AddLocation,
  LocationCity,
  Close,
  AttachMoney,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AddOrEditRouteModal } from "./AddOrEditRouteModal";
import { useMeteorAuth } from "/imports/providers/Auth";

type DeleteRouteDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  deleteAdventureRoute: () => void;
};
const DeleteRouteDialog = (props: DeleteRouteDialogProps) => {
  const { isOpen, onClose, deleteAdventureRoute } = props;
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Delete Adventure Route?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Deleting this route is irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            deleteAdventureRoute();
            onClose();
          }}
        >
          Delete Route
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

type RouteCardProps = {
  adventureRoute: AdventureRoute;
  deleteAdventureRoute?: () => void;
  isInMap?: boolean;
};
export const RouteCard = (props: RouteCardProps) => {
  const { adventureRoute, deleteAdventureRoute, isInMap } = props;

  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [isDeleteRouteDialogOpen, setIsDeleteRouteDialogOpen] = useState(false);

  const navigate = useNavigate();
  const { userId = "" } = useMeteorAuth();

  const handleRouteModalOpen = () => {
    setIsRouteModalOpen(true);
  };
  const handleRouteModalClose = () => {
    setIsRouteModalOpen(false);
  };
  const handleDeleteRouteDialogOpen = () => {
    setIsDeleteRouteDialogOpen(true);
  };
  const handleDeleteRouteDialogClose = () => {
    setIsDeleteRouteDialogOpen(false);
  };
  const openMap = () => {
    navigate(`/map/${adventureRoute._id}`);
  };
  return (
    <Card
      variant="elevation"
      sx={{
        height: isInMap ? undefined : "100%",
        maxWidth: isInMap ? 400 : undefined,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <AddOrEditRouteModal
        adventureRoute={adventureRoute}
        isOpen={isRouteModalOpen}
        onClose={handleRouteModalClose}
      />
      {!isInMap && deleteAdventureRoute && (
        <DeleteRouteDialog
          isOpen={isDeleteRouteDialogOpen}
          onClose={handleDeleteRouteDialogClose}
          deleteAdventureRoute={deleteAdventureRoute}
        />
      )}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          height: "100%",
        }}
      >
        <Typography variant="h5">{adventureRoute.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {adventureRoute.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" display="flex">
          <LocationPin />
          <Box>{adventureRoute.route.origin}</Box>
        </Typography>
        {adventureRoute.route.waypoints?.map((waypoint) => (
          <Typography
            key={waypoint}
            variant="body2"
            color="text.secondary"
            display="flex"
          >
            <AddLocation />
            <Box>{waypoint}</Box>
          </Typography>
        ))}
        <Typography variant="body2" color="text.secondary" display="flex">
          <LocationCity />
          <Box>{adventureRoute.route.destination}</Box>
        </Typography>
        {userId === adventureRoute.userId && (
          <Typography
            variant="body2"
            color={adventureRoute.isPublic ? "success" : "error"}
          >
            {adventureRoute.isPublic ? "Public" : "Private"}
          </Typography>
        )}
        <Typography justifySelf="end">
          {[...Array(adventureRoute.priceCategory)].map((_, i) => (
            <AttachMoney key={i} />
          ))}
        </Typography>
        {adventureRoute.activities?.map((activity) => (
          <Chip key={activity} label={activity} />
        ))}
      </CardContent>
      {!isInMap && (
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          disableSpacing
        >
          <IconButton size="large" onClick={handleDeleteRouteDialogOpen}>
            <Close />
          </IconButton>
          <IconButton size="large" onClick={handleRouteModalOpen}>
            <Edit />
          </IconButton>
          <IconButton size="large" onClick={openMap}>
            <Map />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};
