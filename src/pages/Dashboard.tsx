import { Button, Input, VStack } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <VStack alignItems="center">
      <VStack width={{ smDown: "100%", sm: 400 }}>
        <Input placeholder="Search for route" />
        <Button>Create a Route</Button>
      </VStack>
    </VStack>
  );
};

export default Dashboard;
