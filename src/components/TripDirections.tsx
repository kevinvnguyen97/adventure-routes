import { Accordion, Span, VStack } from "@chakra-ui/react";
import RoadSign from "@components/RoadSign";
import { RouteColors } from "@constants/google";
import { formatDirections } from "@utils/directions";

type TripDirectionsProps = {
  routes: google.maps.DirectionsRoute[];
};
const TripDirections = (props: TripDirectionsProps) => {
  const { routes } = props;
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
      {routes.map(({ summary, legs }, routeIndex) => {
        const roadSignColor = RouteColors[routeIndex];
        return (
          <Accordion.Item value={summary} width="100%">
            <Accordion.ItemTrigger padding={0}>
              <RoadSign
                bgColor={roadSignColor}
                signText={`Via ${formatDirections(summary)}`}
                width="100%"
              />
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <Accordion.Root
                  id={summary}
                  collapsible
                  variant="subtle"
                  unmountOnExit
                >
                  {legs.map(({ steps }, index) => {
                    const stepBeginningLetter = String.fromCharCode(index + 65);
                    const stepEndLetter =
                      index === 27 ? "AA" : String.fromCharCode(index + 66);
                    return (
                      <Accordion.Item value={index.toString()}>
                        <Accordion.ItemTrigger>
                          <Span flex={1}>
                            {stepBeginningLetter} to {stepEndLetter}
                          </Span>
                          <Accordion.ItemIndicator />
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent>
                          <Accordion.ItemBody>
                            <VStack gap={2}>
                              {steps.map(({ instructions }) => (
                                <RoadSign
                                  bgColor={roadSignColor}
                                  signText={formatDirections(instructions)}
                                  width="100%"
                                />
                              ))}
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
      })}
    </Accordion.Root>
  );
};

export default TripDirections;
