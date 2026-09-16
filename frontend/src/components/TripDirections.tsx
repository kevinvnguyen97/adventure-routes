import { Accordion, VStack } from "@chakra-ui/react";
import { RouteColors } from "@constants/google";
import type { GoogleRoute } from "@shared/types/google";
import RouteAccordion from "@components/RouteAccordion";

type TripDirectionsProps = {
  routes: GoogleRoute[];
  areRoutesSelected: boolean[];
  setAreRoutesSelected: (areRoutesSelected: boolean[]) => void;
};
const TripDirections = (props: TripDirectionsProps) => {
  const { routes, areRoutesSelected, setAreRoutesSelected } = props;

  const onRouteChecked = (routeIndex: number) => {
    const newSelectedRoutes = areRoutesSelected.map((routeSelected, i) =>
      i === routeIndex ? !routeSelected : routeSelected,
    );
    setAreRoutesSelected(newSelectedRoutes);
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
          isRouteSelected={areRoutesSelected[routeIndex]}
          onRouteChecked={() => onRouteChecked(routeIndex)}
          roadSignColor={RouteColors[routeIndex]}
        />
      ))}
    </Accordion.Root>
  );
};

export default TripDirections;
