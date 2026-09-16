import { Accordion, Checkbox } from "@chakra-ui/react";
import { formatDirections } from "@utils/directions";
import { formatImperialDistance } from "@utils/distance";
import { formatDuration } from "@utils/duration";
import RoadSign from "./RoadSign";
import type { GoogleRoute } from "@shared/types/google";
import LegAccordion from "@components/LegAccordion";

type RouteAccordionProps = {
  route: GoogleRoute;
  isRouteSelected: boolean;
  onRouteChecked: () => void;
  roadSignColor: string;
};
const RouteAccordion = (props: RouteAccordionProps) => {
  const { route, isRouteSelected, onRouteChecked, roadSignColor } = props;

  const { legs, description, distanceMeters, duration } = route;
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
          checked={isRouteSelected}
          onCheckedChange={onRouteChecked}
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
            {legs.map((leg, index) => {
              const stepBeginningLetter = String.fromCharCode(index + 65);
              const stepEndLetter =
                index === 27 ? "AA" : String.fromCharCode(index + 66);

              return (
                <LegAccordion
                  key={index}
                  accordionValue={index.toString()}
                  leg={leg}
                  stepBeginningLetter={stepBeginningLetter}
                  stepEndLetter={stepEndLetter}
                  roadSignColor={roadSignColor}
                />
              );
            })}
          </Accordion.Root>
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
};

export default RouteAccordion;
