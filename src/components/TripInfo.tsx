import { Box, Heading, Tabs } from "@chakra-ui/react";
import type Trip from "@models/trip";
import { LuInfo, LuMap, LuMessageCircle } from "react-icons/lu";

type TripInfoProps = {
  trip: Trip;
};
const TripInfo = (props: TripInfoProps) => {
  const { trip } = props;
  return (
    <Box paddingTop={5} color="white" paddingRight={5}>
      <Heading>{trip!.name}</Heading>
      <Tabs.Root variant="subtle">
        <Tabs.List>
          <Tabs.Trigger
            value="details"
            color="white"
            bgColor={{ _selected: { _light: "orange.500" } }}
          >
            <LuInfo /> Details
          </Tabs.Trigger>
          <Tabs.Trigger
            value="directions"
            color="white"
            bgColor={{ _selected: { _light: "orange.500" } }}
          >
            <LuMap /> Directions
          </Tabs.Trigger>
          <Tabs.Trigger
            value="comments"
            color="white"
            bgColor={{ _selected: { _light: "orange.500" } }}
          >
            <LuMessageCircle /> Comments
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.ContentGroup>
          <Tabs.Content value="details">Details</Tabs.Content>
          <Tabs.Content value="directions">Directions</Tabs.Content>
          <Tabs.Content value="comments">Comments</Tabs.Content>
        </Tabs.ContentGroup>
      </Tabs.Root>
    </Box>
  );
};
export default TripInfo;
