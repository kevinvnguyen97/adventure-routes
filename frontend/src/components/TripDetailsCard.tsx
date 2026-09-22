import { Card, HStack, CloseButton } from "@chakra-ui/react";
import TripTabs from "@components/TripTabs";
import type Trip from "@shared/models/trip";
import type { GoogleRoute } from "@shared/types/google";

type TripDetailsProps = {
  trip: Trip;
  isInfoVisible: boolean;
  setIsInfoVisible: (isInfoVisible: boolean) => void;
  routes: GoogleRoute[];
  selectedRouteIndex: number;
  setSelectedRouteIndex: (routeIndex: number) => void;
  tab: string;
  setTab: (tab: string) => void;
};

const TripDetailsCard = (props: TripDetailsProps) => {
  const {
    trip,
    isInfoVisible,
    setIsInfoVisible,
    routes,
    selectedRouteIndex,
    setSelectedRouteIndex,
    tab,
    setTab,
  } = props;

  const { name } = trip;

  return (
    <Card.Root
      variant="subtle"
      size="lg"
      bgColor={{ _light: "orange.500" }}
      color="text"
      width={isInfoVisible ? 600 : 0}
      data-state="open"
      transition="width 0.5s ease"
      height="calc(100vh - 120px)"
      overflowY="scroll"
    >
      <Card.Header as={HStack} justifyContent="space-between">
        <Card.Title>{name}</Card.Title>
        <CloseButton
          color="text"
          colorPalette="red"
          _hover={{ bgColor: { _light: "white" }, color: "red" }}
          onClick={() => setIsInfoVisible(false)}
        />
      </Card.Header>
      <Card.Body>
        <TripTabs
          trip={trip}
          tab={tab}
          setTab={setTab}
          routes={routes}
          selectedRouteIndex={selectedRouteIndex}
          setSelectedRouteIndex={setSelectedRouteIndex}
        />
      </Card.Body>
    </Card.Root>
  );
};

export default TripDetailsCard;
