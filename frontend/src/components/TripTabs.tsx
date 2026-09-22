import {
  Badge,
  Span,
  Tabs,
  Text,
  Wrap,
  Separator,
  HStack,
} from "@chakra-ui/react";
import type Trip from "@shared/models/trip";
import { LuInfo, LuMap, LuMessageCircle, LuSettings } from "react-icons/lu";
import TripDirections from "@components/TripDirections";
import { defaultActivities } from "@constants/activities";
import type { GoogleRoute } from "@shared/types/google";

type TripTabsProps = {
  trip: Trip;
  tab: string;
  setTab: (tab: string) => void;
  routes: GoogleRoute[];
  selectedRouteIndex: number;
  setSelectedRouteIndex: (routeIndex: number) => void;
};
const TripTabs = (props: TripTabsProps) => {
  const {
    trip,
    tab,
    setTab,
    routes,
    selectedRouteIndex,
    setSelectedRouteIndex,
  } = props;
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
          color="text"
          _selected={{ bgColor: { _light: "orange.600", _dark: "gray.800" } }}
        >
          <LuInfo size={25} />
        </Tabs.Trigger>
        <Tabs.Trigger
          value="directions"
          color="text"
          _selected={{ bgColor: { _light: "orange.600", _dark: "gray.800" } }}
        >
          <LuMap size={25} />
        </Tabs.Trigger>
        <Tabs.Trigger
          value="comments"
          color="text"
          _selected={{ bgColor: { _light: "orange.600", _dark: "gray.800" } }}
        >
          <LuMessageCircle size={25} />
        </Tabs.Trigger>
        <Tabs.Trigger
          value="settings"
          color="text"
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
              <Text key={waypoint}>
                <Span fontWeight="bold">
                  {isOrigin ? "Origin" : isDestination ? "Destination" : "Stop"}{" "}
                  {`(${String.fromCharCode(i + 65)}): `}
                </Span>
                <Span>{waypoint}</Span>
              </Text>
            );
          })}
          <Wrap gap={0.5}>
            {activities.map((activity) => {
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
            selectedRouteIndex={selectedRouteIndex}
            setSelectedRouteIndex={setSelectedRouteIndex}
          />
        </Tabs.Content>
        <Tabs.Content value="comments">Comments</Tabs.Content>
        <Tabs.Content value="settings">Settings</Tabs.Content>
      </Tabs.ContentGroup>
    </Tabs.Root>
  );
};
export default TripTabs;
