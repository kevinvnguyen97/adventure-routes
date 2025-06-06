import {
  Field,
  Combobox,
  useFilter,
  useListCollection,
  Wrap,
  Badge,
  VStack,
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
      label: activity,
      value: activity,
    })),
    filter: contains,
  });

  return (
    <Field.Root orientation="horizontal">
      <Field.Label marginTop={activities.length > 0 ? 5 : 0}>
        Activities
      </Field.Label>
      <VStack width="100%">
        <Wrap gap={2}>
          {activities.map((activity) => (
            <Badge key={activity}>{activity}</Badge>
          ))}
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
                  {activity.label}
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
