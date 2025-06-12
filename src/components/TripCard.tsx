import {
  Card,
  HStack,
  Wrap,
  Badge,
  IconButton,
  Box,
  ButtonGroup,
  CloseButton,
  Span,
} from "@chakra-ui/react";
import { LuMap, LuPencil } from "react-icons/lu";
import TripFormDialog from "@components/TripFormDialog";
import type Trip from "@models/trip";
import { useNavigate } from "react-router-dom";

type TripCardProps = {
  trip: Trip;
  refetchTrips: () => void;
};
const TripCard = (props: TripCardProps) => {
  const { trip, refetchTrips } = props;
  const navigate = useNavigate();
  return (
    <Card.Root
      bgColor={{ _light: "orange.500" }}
      width="100%"
      color="white"
      variant="subtle"
    >
      <HStack
        justifyContent="space-between"
        alignItems="flex-start"
        height="100%"
      >
        <Box width="100%">
          <Card.Header>
            <Card.Title>{trip.name}</Card.Title>
            <Card.Description color="white">
              {trip.description}
            </Card.Description>
          </Card.Header>
          <Card.Body>
            <Card.Description color="white">
              <Span fontWeight="bold">Origin: </Span>
              <Span>{trip.waypoints[0]}</Span>
            </Card.Description>
            <Card.Description color="white">
              <Span fontWeight="bold">Destination: </Span>
              <Span>{trip.waypoints[trip.waypoints.length - 1]}</Span>
            </Card.Description>
          </Card.Body>
          <Card.Footer>
            <Wrap gap={0.5}>
              {trip.activities?.map((activity) => (
                <Badge key={activity}>{activity}</Badge>
              ))}
            </Wrap>
          </Card.Footer>
        </Box>
        <ButtonGroup
          orientation="vertical"
          variant="ghost"
          justifyContent="space-between"
          height="100%"
        >
          <CloseButton
            color="white"
            colorPalette="red"
            _hover={{ bgColor: { _light: "white" }, color: "red" }}
          />
          <TripFormDialog
            trip={trip}
            triggerButton={
              <IconButton
                color="white"
                bgColor={{ _hover: { _light: "orange.600" } }}
              >
                <LuPencil />
              </IconButton>
            }
            refetchTrips={refetchTrips}
          />
          <IconButton
            color="white"
            bgColor={{ _hover: { _light: "orange.600" } }}
            onClick={() => navigate(`map/${trip._id}`)}
          >
            <LuMap />
          </IconButton>
        </ButtonGroup>
      </HStack>
    </Card.Root>
  );
};
export default TripCard;
