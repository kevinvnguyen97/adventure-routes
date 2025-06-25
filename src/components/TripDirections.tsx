import { Accordion, Box, Span } from "@chakra-ui/react";

type TripDirectionsProps = {
  routes: google.maps.DirectionsRoute[];
};
const TripDirections = (props: TripDirectionsProps) => {
  const { routes } = props;
  return (
    <Accordion.Root id="route" collapsible variant="subtle" unmountOnExit>
      {routes.map(({ summary, legs }) => (
        <Accordion.Item value={summary}>
          <Accordion.ItemTrigger>
            <Span flex={1}>Via {summary}</Span>
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
                          {steps.map(({ instructions }) => (
                            <Box
                              dangerouslySetInnerHTML={{ __html: instructions }}
                            />
                          ))}
                        </Accordion.ItemBody>
                      </Accordion.ItemContent>
                    </Accordion.Item>
                  );
                })}
              </Accordion.Root>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export default TripDirections;
