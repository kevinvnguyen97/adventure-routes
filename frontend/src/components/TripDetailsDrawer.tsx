import { Drawer, CloseButton } from "@chakra-ui/react";
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
const TripDetailsDrawer = (props: TripDetailsProps) => {
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

  const { name } = trip || {};

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
            <TripTabs
              trip={trip}
              tab={tab}
              setTab={setTab}
              routes={routes}
              areRoutesSelected={areRoutesSelected}
              setAreRoutesSelected={setAreRoutesSelected}
            />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};

export default TripDetailsDrawer;
