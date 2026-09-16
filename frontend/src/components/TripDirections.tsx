import { Accordion, Checkbox, Span, VStack } from "@chakra-ui/react";
import RoadSign from "@components/RoadSign";
import { RouteColors } from "@constants/google";
import type { GoogleRoute } from "@shared/types/google";
import { formatDirections } from "@utils/directions";
import { formatImperialDistance } from "@utils/distance";
import { formatDuration } from "@utils/duration";

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
      {routes.map(
        ({ description, legs, distanceMeters, duration }, routeIndex) => {
          const roadSignColor = RouteColors[routeIndex];

          const durationNumber = parseInt(duration.replaceAll("s", ""));

          const formattedDistance = formatImperialDistance(distanceMeters);
          const formattedDuration = formatDuration(durationNumber);

          return (
            <Accordion.Item
              key={description}
              value={description}
              width="100%"
              bgColor="transparent"
            >
              <Accordion.ItemTrigger padding={0}>
                <Checkbox.Root
                  variant="subtle"
                  width="100%"
                  onClick={(e) => e.stopPropagation()}
                  checked={areRoutesSelected[routeIndex]}
                  onCheckedChange={() => onRouteChecked(routeIndex)}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label width="100%">
                    <RoadSign
                      bgColor={roadSignColor}
                      signText={`Via ${formatDirections(description)}`}
                      width="100%"
                      distance={formattedDistance}
                      duration={formattedDuration}
                    />
                  </Checkbox.Label>
                </Checkbox.Root>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  <Accordion.Root
                    id={description}
                    collapsible
                    variant="subtle"
                    unmountOnExit
                  >
                    {legs.map(({ steps }, index) => {
                      const stepBeginningLetter = String.fromCharCode(
                        index + 65,
                      );
                      const stepEndLetter =
                        index === 27 ? "AA" : String.fromCharCode(index + 66);

                      return (
                        <Accordion.Item
                          key={index}
                          value={index.toString()}
                          bgColor="transparent"
                        >
                          <Accordion.ItemTrigger
                            paddingLeft={0}
                            paddingRight={0}
                          >
                            <Span flex={1}>
                              {stepBeginningLetter} to {stepEndLetter}
                            </Span>
                            <Accordion.ItemIndicator />
                          </Accordion.ItemTrigger>
                          <Accordion.ItemContent>
                            <Accordion.ItemBody>
                              <VStack gap={2}>
                                {steps.map(
                                  ({
                                    navigationInstruction,
                                    staticDuration,
                                    distanceMeters,
                                  }) => {
                                    const { instructions } =
                                      navigationInstruction;

                                    const formattedStepDistance =
                                      formatImperialDistance(distanceMeters);

                                    const durationStepNumber = parseInt(
                                      staticDuration.replaceAll("s", ""),
                                    );

                                    const formattedStepDuration =
                                      formatDuration(durationStepNumber);

                                    return (
                                      <RoadSign
                                        key={instructions}
                                        bgColor={roadSignColor}
                                        signText={formatDirections(
                                          instructions,
                                        )}
                                        width="100%"
                                        duration={formattedStepDuration}
                                        distance={formattedStepDistance}
                                      />
                                    );
                                  },
                                )}
                              </VStack>
                            </Accordion.ItemBody>
                          </Accordion.ItemContent>
                        </Accordion.Item>
                      );
                    })}
                  </Accordion.Root>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          );
        },
      )}
    </Accordion.Root>
  );
};

export default TripDirections;
