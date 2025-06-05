import { Input, VStack } from "@chakra-ui/react";
import RouteFormDialog from "@components/RouteFormDialog";

const Dashboard = () => {
  return (
    <VStack alignItems="center">
      <VStack width={{ smDown: "100%", sm: 400 }}>
        <Input size="2xl" variant="subtle" placeholder="Search for route" />
        <RouteFormDialog />
      </VStack>
    </VStack>
  );
};

export default Dashboard;
