import { Card, HStack, CloseButton } from "@chakra-ui/react";
import TripTabs from "@components/TripTabs";
import type Trip from "@models/trip";

type TripDetailsProps = {
  trip: Trip;
  isInfoVisible: boolean;
  setIsInfoVisible: (isInfoVisible: boolean) => void;
  routes: google.maps.DirectionsRoute[];
  areRoutesSelected: boolean[];
  setAreRoutesSelected: (areRoutesSelected: boolean[]) => void;
  tab: string;
  setTab: (tab: string) => void;
};

const TripDetailsCard = (props: TripDetailsProps) => {
  const {
    trip,
    isInfoVisible,
    setIsInfoVisible,
    routes,
    areRoutesSelected,
    setAreRoutesSelected,
    tab,
    setTab,
  } = props;

  const { name } = trip;

  return (
    <Card.Root
      variant="subtle"
      size="lg"
      bgColor={{ _light: "orange.500" }}
      color="white"
      width={isInfoVisible ? 600 : 0}
      data-state="open"
      transition="width 0.5s ease"
      height="calc(100vh - 120px)"
      overflowY="scroll"
    >
      <Card.Header as={HStack} justifyContent="space-between">
        <Card.Title>{name}</Card.Title>
        <CloseButton
          color="white"
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
          areRoutesSelected={areRoutesSelected}
          setAreRoutesSelected={setAreRoutesSelected}
        />
      </Card.Body>
    </Card.Root>
  );
};

export default TripDetailsCard;
