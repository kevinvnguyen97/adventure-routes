import { Badge, Box, Heading, Span, Tabs, Text, Wrap } from "@chakra-ui/react";
import type Trip from "@models/trip";
import { LuInfo, LuMap, LuMessageCircle } from "react-icons/lu";

type TripInfoProps = {
  trip: Trip;
  tab: string;
  setTab: (tab: string) => void;
};
const TripInfo = (props: TripInfoProps) => {
  const { trip, tab, setTab } = props;
  const { name, description, activities = [], waypoints } = trip;

  return (
    <Box color="white" paddingRight={5}>
      <Heading>{name}</Heading>
      <Tabs.Root
        value={tab}
        onValueChange={(e) => setTab(e.value)}
        variant="subtle"
      >
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
          <Tabs.Content value="details">
            <Text>{description}</Text>
            {waypoints.map((waypoint, i) => {
              const isOrigin = i === 0;
              const isDestination = i === waypoints.length - 1;

              return (
                <Text>
                  <Span fontWeight="bold">
                    {isOrigin
                      ? "Origin"
                      : isDestination
                      ? "Destination"
                      : "Stop"}{" "}
                    {`(${String.fromCharCode(i + 65)}): `}
                  </Span>
                  <Span>{waypoint}</Span>
                </Text>
              );
            })}
            <Wrap gap={0.5}>
              {activities.map((activity) => {
                return <Badge key={activity}>{activity}</Badge>;
              })}
            </Wrap>
          </Tabs.Content>
          <Tabs.Content value="directions">Directions</Tabs.Content>
          <Tabs.Content value="comments">Comments</Tabs.Content>
        </Tabs.ContentGroup>
      </Tabs.Root>
    </Box>
  );
};
export default TripInfo;
