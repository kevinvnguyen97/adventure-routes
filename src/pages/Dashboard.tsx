import {
  Badge,
  Button,
  Card,
  HStack,
  IconButton,
  Input,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import TripFormDialog from "@components/TripFormDialog";
import { useTrips } from "@hooks/trip";
import { LuPencil } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { trips, isLoading } = useTrips();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <VStack
      alignItems="center"
      data-state="open"
      _open={{ animation: "fade-in 1s ease-out" }}
    >
      <VStack width={{ smDown: "100%", sm: 400 }}>
        <Input size="2xl" variant="subtle" placeholder="Search for route" />
        <TripFormDialog triggerButton={<Button>Create a Route</Button>} />
        {trips.map((trip) => (
          <Card.Root
            bgColor={{ _light: "orange.500" }}
            color="white"
            variant="subtle"
          >
            <Card.Header fontWeight="bold" as={HStack}>
              {trip.name}
            </Card.Header>
            <Card.Body>
              <Card.Description>{trip.description}</Card.Description>
            </Card.Body>
            <Card.Footer>
              <Wrap gap={0.5}>
                {trip.activities?.map((activity) => (
                  <Badge key={activity}>{activity}</Badge>
                ))}
                <TripFormDialog
                  trip={trip}
                  triggerButton={
                    <IconButton>
                      <LuPencil />
                    </IconButton>
                  }
                />
                <Button onClick={() => navigate(`/map/${trip._id}`)}>
                  Map
                </Button>
              </Wrap>
            </Card.Footer>
          </Card.Root>
        ))}
      </VStack>
    </VStack>
  );
};

export default Dashboard;
