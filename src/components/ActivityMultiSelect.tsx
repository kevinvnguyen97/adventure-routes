import {
  Field,
  Combobox,
  createListCollection,
  useFilter,
  useListCollection,
} from "@chakra-ui/react";
import { defaultActivities } from "@constants/activities";

type ActivityMultiSelectProps = {
  activities: string[];
};
const ActivityMultiSelect = (props: ActivityMultiSelectProps) => {
  const { activities } = props;
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
      <Field.Label>Activities</Field.Label>
      <Combobox.Root
        value={activities}
        collection={activityCollection}
        onInputValueChange={(e) => filter(e.inputValue)}
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
    </Field.Root>
  );
};

export default ActivityMultiSelect;
