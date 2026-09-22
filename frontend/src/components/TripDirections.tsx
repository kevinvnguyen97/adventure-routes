import { Accordion, VStack } from "@chakra-ui/react";
import { RouteColors } from "@shared/constants/color";
import type { GoogleRoute } from "@shared/types/google";
import RouteAccordion from "@components/RouteAccordion";

type TripDirectionsProps = {
  routes: GoogleRoute[];
  selectedRouteIndex: number;
  setSelectedRouteIndex: (routeIndex: number) => void;
};
const TripDirections = (props: TripDirectionsProps) => {
  const { routes, selectedRouteIndex, setSelectedRouteIndex } = props;

  const onRouteChecked = (routeIndex: number) => {
    setSelectedRouteIndex(routeIndex);
  };

  return (
    <Accordion.Root
      id="route"
      collapsible
      variant="subtle"
      unmountOnExit
      size="lg"
      as={VStack}
      gap={2}
    >
      {routes.map((route, routeIndex) => (
        <RouteAccordion
          key={routeIndex}
          route={route}
          isRouteSelected={selectedRouteIndex === routeIndex}
          onRouteChecked={() => onRouteChecked(routeIndex)}
          roadSignColor={RouteColors[routeIndex]}
        />
      ))}
    </Accordion.Root>
  );
};

export default TripDirections;
