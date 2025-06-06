import {
  Dialog,
  Button,
  Portal,
  Input,
  Textarea,
  createListCollection,
  Combobox,
  Field,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { defaultActivities } from "@constants/activities";
import PriceCategorySlider from "@components/PriceCategorySlider";
import WaypointTextField from "@components/WaypointTextField";

const RouteFormDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceCategory, setPriceCategory] = useState(0);
  const [activities, setActivities] = useState<string[]>([]);
  const [waypoints, setWaypoints] = useState<WaypointInput[]>([
    { id: Math.random(), text: "" },
    { id: Math.random(), text: "" },
  ]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const activeIndex = waypoints.findIndex(
        (waypoint) => active.id === waypoint.id
      );
      const overIndex = waypoints.findIndex(
        (waypoint) => over?.id === waypoint.id
      );

      const newWaypoints = arrayMove(waypoints, activeIndex, overIndex);
      setWaypoints(newWaypoints);
    }
  };

  const onWaypointChange = (args: { newWaypointValue: string; id: number }) => {
    const { newWaypointValue, id } = args;
    const newWaypoints = waypoints.map((waypoint) =>
      waypoint.id === id ? { ...waypoint, text: newWaypointValue } : waypoint
    );
    setWaypoints(newWaypoints);
  };

  const removeWaypoint = (id: number) => {
    const newWaypoints = waypoints.filter((waypoint) => id !== waypoint.id);
    setWaypoints(newWaypoints);
  };

  const addWaypoint = (indexToAdd: number) => {
    const updatedWaypoints = waypoints.toSpliced(indexToAdd + 1, 0, {
      id: Math.random(),
      text: "",
    });
    setWaypoints(updatedWaypoints);
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
              <DndContext
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
                sensors={sensors}
              >
                <SortableContext
                  items={waypoints}
                  strategy={verticalListSortingStrategy}
                >
                  {waypoints.map((waypoint, index) => {
                    return (
                      <WaypointTextField
                        key={waypoint.id}
                        waypoint={waypoint}
                        stopNumber={index}
                        isOrigin={index === 0}
                        isDestination={index === waypoints.length - 1}
                        hasMoreWaypoints={waypoints.length > 2}
                        addWaypoint={() => addWaypoint(index)}
                        removeWaypoint={() => removeWaypoint(waypoint.id)}
                        onWaypointChange={(newWaypointValue) =>
                          onWaypointChange({
                            newWaypointValue,
                            id: waypoint.id,
                          })
                        }
                      />
                    );
                  })}
                </SortableContext>
              </DndContext>
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
