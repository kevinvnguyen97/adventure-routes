import {
  Dialog,
  Button,
  Portal,
  Input,
  VStack,
  Textarea,
  Select,
  Slider,
  createListCollection,
  Combobox,
  useListCollection,
} from "@chakra-ui/react";
import { useState } from "react";

import { defaultActivities } from "@constants/activities";

const RouteFormDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceCategory, setPriceCategory] = useState([0]);
  const [activities, setActivities] = useState<string[]>([]);
  const [origin, setOrigin] = useState("");
  const [stops, setStops] = useState<string[]>([""]);
  const [destination, setDestination] = useState("");

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
      lazyMount
      placement="center"
    >
      <Dialog.Trigger asChild>
        <Button>Create a Route</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create Adventure Route</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body as={VStack} gap={5}>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                variant="subtle"
              />
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                variant="subtle"
              />
              <Slider.Root
                value={priceCategory}
                onValueChange={(e) => setPriceCategory(e.value)}
                width="100%"
                step={1}
                max={3}
                thumbSize={{ width: 16, height: 16 }}
                variant="solid"
                colorPalette="orange"
              >
                <Slider.Label>Price Category</Slider.Label>
                <Slider.Control>
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumbs />
                </Slider.Control>
              </Slider.Root>
              <Combobox.Root
                collection={activityCollection}
                multiple
                variant="subtle"
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
              <Input
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Origin"
                variant="subtle"
              />
              <Input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination"
                variant="subtle"
              />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="ghost" colorPalette="red">
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="orange">Create</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

const activityCollection = createListCollection({
  items: defaultActivities.map((activity) => ({
    label: activity,
    value: activity,
  })),
});

export default RouteFormDialog;
