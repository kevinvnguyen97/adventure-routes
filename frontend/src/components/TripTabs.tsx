import {
  Badge,
  Span,
  Tabs,
  Text,
  Wrap,
  Separator,
  HStack,
} from "@chakra-ui/react";
import type Trip from "@models/trip";
import { LuInfo, LuMap, LuMessageCircle, LuSettings } from "react-icons/lu";
import TripDirections from "@components/TripDirections";
import { defaultActivities } from "@constants/activities";

type TripTabsProps = {
  trip: Trip;
  tab: string;
  setTab: (tab: string) => void;
  routes: google.maps.DirectionsRoute[];
  areRoutesSelected: boolean[];
  setAreRoutesSelected: (areRoutesSelected: boolean[]) => void;
};
const TripTabs = (props: TripTabsProps) => {
  const { trip, tab, setTab, routes, areRoutesSelected, setAreRoutesSelected } =
    props;
  const { description, activities = [], waypoints } = trip;

  return (
    <Tabs.Root
      value={tab}
      onValueChange={(e) => setTab(e.value)}
      variant="subtle"
      fitted
      size="lg"
    >
      <Tabs.List>
        <Tabs.Trigger
          value="details"
          color="white"
          _selected={{ bgColor: { _light: "orange.600", _dark: "gray.800" } }}
        >
          <LuInfo size={25} />
        </Tabs.Trigger>
        <Tabs.Trigger
          value="directions"
          color="white"
          _selected={{ bgColor: { _light: "orange.600", _dark: "gray.800" } }}
        >
          <LuMap size={25} />
        </Tabs.Trigger>
        <Tabs.Trigger
          value="comments"
          color="white"
          _selected={{ bgColor: { _light: "orange.600", _dark: "gray.800" } }}
        >
          <LuMessageCircle size={25} />
        </Tabs.Trigger>
        <Tabs.Trigger
          value="settings"
          color="white"
          _selected={{ bgColor: { _light: "orange.600", _dark: "gray.800" } }}
        >
          <LuSettings size={25} />
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.ContentGroup>
        <Tabs.Content value="details">
          <Text fontSize={18}>{description}</Text>
          <Separator />
          {waypoints.map((waypoint, i) => {
            const isOrigin = i === 0;
            const isDestination = i === waypoints.length - 1;

            return (
              <Text>
                <Span fontWeight="bold">
                  {isOrigin ? "Origin" : isDestination ? "Destination" : "Stop"}{" "}
                  {`(${String.fromCharCode(i + 65)}): `}
                </Span>
                <Span>{waypoint}</Span>
              </Text>
            );
          })}
          <Wrap gap={0.5}>
            {activities.map((activity, i) => {
              const activityIcon = defaultActivities.find(
                (defaultActivity) => defaultActivity.text === activity,
              )?.icon;

              return (
                <Badge key={activity}>
                  <HStack>
                    {activityIcon}
                    <Text>{activity}</Text>
                  </HStack>
                </Badge>
              );
            })}
          </Wrap>
        </Tabs.Content>
        <Tabs.Content value="directions">
          <TripDirections
            routes={routes}
            areRoutesSelected={areRoutesSelected}
            setAreRoutesSelected={setAreRoutesSelected}
          />
        </Tabs.Content>
        <Tabs.Content value="comments">Comments</Tabs.Content>
        <Tabs.Content value="settings">Settings</Tabs.Content>
      </Tabs.ContentGroup>
    </Tabs.Root>
  );
};
export default TripTabs;
