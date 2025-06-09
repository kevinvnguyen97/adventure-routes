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
import RouteFormDialog from "@components/RouteFormDialog";
import { useAdventureRoutes } from "@hooks/adventureRoute";
import { LuPencil } from "react-icons/lu";

const Dashboard = () => {
  const { adventureRoutes, isLoading } = useAdventureRoutes();

  console.log("Adventure Routes:", adventureRoutes);

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
        <RouteFormDialog triggerButton={<Button>Create a Route</Button>} />
        {adventureRoutes.map((adventureRoute) => (
          <Card.Root
            bgColor={{ _light: "orange.500" }}
            color="white"
            variant="subtle"
          >
            <Card.Header fontWeight="bold" as={HStack}>
              {adventureRoute.name}
              <RouteFormDialog
                adventureRoute={adventureRoute}
                triggerButton={
                  <IconButton>
                    <LuPencil />
                  </IconButton>
                }
              />
            </Card.Header>
            <Card.Description>{adventureRoute.description}</Card.Description>
            <Card.Body></Card.Body>
            <Card.Footer>
              <Wrap gap={0.5}>
                {adventureRoute.activities?.map((activity) => (
                  <Badge key={activity}>{activity}</Badge>
                ))}
              </Wrap>
            </Card.Footer>
          </Card.Root>
        ))}
      </VStack>
    </VStack>
  );
};

export default Dashboard;
