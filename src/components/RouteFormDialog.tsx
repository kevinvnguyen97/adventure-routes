import {
  Dialog,
  Button,
  Portal,
  Input,
  Textarea,
  createListCollection,
  Combobox,
  InputGroup,
  IconButton,
  Box,
  Field,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

import { defaultActivities } from "@constants/activities";
import PriceCategorySlider from "@components/PriceCategorySlider";
import { Form } from "react-router-dom";

const RouteFormDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceCategory, setPriceCategory] = useState(0);
  const [activities, setActivities] = useState<string[]>([]);
  const [origin, setOrigin] = useState("");
  const [stops, setStops] = useState<string[]>([""]);
  const [destination, setDestination] = useState("");

  const onStopChange = (args: { newStopValue: string; index: number }) => {
    const { newStopValue, index } = args;
    const newStops = stops.map((stop, i) =>
      i === index ? newStopValue : stop
    );
    setStops(newStops);
  };

  const removeStop = (indexToRemove: number) => {
    const newStops = stops.filter((_, i) => i !== indexToRemove);
    setStops(newStops);
  };

  const addStop = () => {
    setStops((prev) => [...prev, ""]);
  };

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
          <Dialog.Content colorPalette="orange">
            <Dialog.Header>
              <Dialog.Title>Create Adventure Route</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body
              as="form"
              display="flex"
              flexDirection="column"
              gap={5}
            >
              <Field.Root orientation="horizontal">
                <Field.Label>Name</Field.Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  variant="subtle"
                />
              </Field.Root>
              <Field.Root orientation="horizontal">
                <Field.Label>Description</Field.Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  variant="subtle"
                />
              </Field.Root>
              <PriceCategorySlider
                priceCategory={priceCategory}
                setPriceCategory={setPriceCategory}
              />
              <Field.Root orientation="horizontal">
                <Field.Label>Activities</Field.Label>
                <Combobox.Root
                  value={activities}
                  collection={activityCollection}
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
              <Field.Root orientation="horizontal">
                <Field.Label>Origin</Field.Label>
                <Input
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="Enter address or place of interest"
                  variant="subtle"
                />
              </Field.Root>
              {stops.map((stop, index) => {
                return (
                  <InputGroup
                    key={index}
                    endElement={
                      <Box>
                        {stops.length > 1 && (
                          <IconButton
                            onClick={() => removeStop(index)}
                            variant="ghost"
                            color="red"
                          >
                            <LuMinus />
                          </IconButton>
                        )}
                        <IconButton onClick={addStop} variant="ghost">
                          <LuPlus />
                        </IconButton>
                      </Box>
                    }
                  >
                    <Field.Root orientation="horizontal">
                      <Field.Label>Stop #{index + 1}</Field.Label>
                      <Input
                        value={stop}
                        onChange={(e) =>
                          onStopChange({ newStopValue: e.target.value, index })
                        }
                        placeholder="Enter address or place of interest"
                        variant="subtle"
                      />
                    </Field.Root>
                  </InputGroup>
                );
              })}
              <Field.Root orientation="horizontal">
                <Field.Label>Destination</Field.Label>
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter address or place of interest"
                  variant="subtle"
                />
              </Field.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="ghost" colorPalette="red">
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button>Create</Button>
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
