import {
  Field,
  Combobox,
  useFilter,
  useListCollection,
  Wrap,
  Badge,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { defaultActivities } from "@constants/activities";

type ActivityMultiSelectProps = {
  activities: string[];
  setActivities: (activities: string[]) => void;
};
const ActivityMultiSelect = (props: ActivityMultiSelectProps) => {
  const { activities, setActivities } = props;
  const { contains } = useFilter({ sensitivity: "base" });

  const { collection: activityCollection, filter } = useListCollection({
    initialItems: defaultActivities.map((activity) => ({
      icon: activity.icon,
      label: activity.text,
      value: activity.text,
    })),
    filter: contains,
  });

  return (
    <Field.Root orientation="horizontal">
      <Field.Label color="white" marginTop={activities.length > 0 ? 5 : 0}>
        Activities
      </Field.Label>
      <VStack width="100%">
        <Wrap gap={0.5}>
          {activities.map((activity) => {
            const defaultActivity = defaultActivities.find(
              (defaultActivity) => defaultActivity.text === activity
            );
            return (
              <Badge key={activity}>
                {defaultActivity!.icon} {activity}
              </Badge>
            );
          })}
        </Wrap>
        <Combobox.Root
          value={activities}
          collection={activityCollection}
          onInputValueChange={(e) => filter(e.inputValue)}
          onValueChange={(e) => setActivities(e.value)}
          multiple
          variant="subtle"
          display="flex"
        >
          <Combobox.Control>
            <Combobox.Input placeholder="Select activities" />
            <Combobox.IndicatorGroup>
              <Combobox.ClearTrigger />
              <Combobox.Trigger />
            </Combobox.IndicatorGroup>
          </Combobox.Control>
          <Combobox.Positioner>
            <Combobox.Content>
              {activityCollection.items.map((activity) => (
                <Combobox.Item item={activity} key={activity.value}>
                  <HStack>
                    {activity.icon}
                    <Text>{activity.label}</Text>
                  </HStack>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.Content>
          </Combobox.Positioner>
        </Combobox.Root>
      </VStack>
    </Field.Root>
  );
};

export default ActivityMultiSelect;
