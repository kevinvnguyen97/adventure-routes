import { Card, Input, VStack } from "@chakra-ui/react";
import RouteFormDialog from "@components/RouteFormDialog";
import { useAdventureRoutes } from "@hooks/adventureRoute";

const Dashboard = () => {
  const { adventureRoutes, isLoading } = useAdventureRoutes();

  console.log("Adventure Routes:", adventureRoutes);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <VStack alignItems="center">
      <VStack width={{ smDown: "100%", sm: 400 }}>
        <Input size="2xl" variant="subtle" placeholder="Search for route" />
        <RouteFormDialog />
        {adventureRoutes.map((adventureRoute) => (
          <Card.Root
            bgColor={{ _light: "orange.500" }}
            color="white"
            variant="subtle"
          >
            <Card.Header fontWeight="bold">{adventureRoute.name}</Card.Header>
            <Card.Body>{adventureRoute.description}</Card.Body>
            <Card.Footer />
          </Card.Root>
        ))}
      </VStack>
    </VStack>
  );
};

export default Dashboard;
