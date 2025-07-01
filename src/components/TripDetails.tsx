import {
  Card,
  CloseButton,
  Drawer,
  HStack,
  useMediaQuery,
} from "@chakra-ui/react";
import TripTabs from "@components/TripTabs";
import type Trip from "@models/trip";
import { useState } from "react";

type TripDetailsProps = {
  trip: Trip;
  isInfoVisible: boolean;
  setIsInfoVisible: (isInfoVisible: boolean) => void;
  routes: google.maps.DirectionsRoute[];
  areRoutesSelected: boolean[];
  setAreRoutesSelected: (areRoutesSelected: boolean[]) => void;
};
const TripDetails = (props: TripDetailsProps) => {
  const [isLandscape] = useMediaQuery(["(orientation: landscape)"]);
  const [tab, setTab] = useState("details");

  const {
    trip,
    isInfoVisible,
    setIsInfoVisible,
    routes,
    areRoutesSelected,
    setAreRoutesSelected,
  } = props;

  const { name } = trip;

  if (isLandscape) {
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
  }
  return (
    <Drawer.Root
      open={isInfoVisible}
      onOpenChange={(e) => setIsInfoVisible(e.open)}
      placement="start"
      size="sm"
    >
      <Drawer.Backdrop />
      <Drawer.Trigger />
      <Drawer.Positioner padding={5}>
        <Drawer.Content
          bgColor={{ _light: "orange/60", _dark: "gray.950/60" }}
          color="white"
          backdropFilter="blur(5px)"
          borderRadius={5}
        >
          <Drawer.CloseTrigger>
            <CloseButton
              color="white"
              colorPalette="red"
              _hover={{ bgColor: { _light: "white" }, color: "red" }}
              onClick={() => setIsInfoVisible(false)}
            />
          </Drawer.CloseTrigger>
          <Drawer.Header>
            <Drawer.Title>{name}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <TripTabs trip={trip} tab={tab} setTab={setTab} routes={routes} />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};

export default TripDetails;
