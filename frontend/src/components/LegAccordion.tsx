import type { GoogleLeg } from "@shared/types/google";
import { Accordion, Span, VStack } from "@chakra-ui/react";
import { formatDirections } from "@utils/directions";
import { formatImperialDistance } from "@utils/distance";
import { formatDuration } from "@utils/duration";
import RoadSign from "@components/RoadSign";

type LegAccordionProps = {
  leg: GoogleLeg;
  stepBeginningLetter: string;
  stepEndLetter: string;
  accordionValue: string;
  roadSignColor: string;
};
const LegAccordion = (props: LegAccordionProps) => {
  const {
    leg,
    accordionValue,
    stepBeginningLetter,
    stepEndLetter,
    roadSignColor,
  } = props;
  const { steps } = leg;

  return (
    <Accordion.Item value={accordionValue} bgColor="transparent">
      <Accordion.ItemTrigger paddingLeft={0} paddingRight={0}>
        <Span flex={1}>
          {stepBeginningLetter} to {stepEndLetter}
        </Span>
        <Accordion.ItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody>
          <VStack gap={2}>
            {steps.map(
              ({ navigationInstruction, staticDuration, distanceMeters }) => {
                const { instructions } = navigationInstruction;

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
                    signText={formatDirections(instructions)}
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
};

export default LegAccordion;
