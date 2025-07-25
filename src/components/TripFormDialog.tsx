import {
  Dialog,
  Button,
  Portal,
  Input,
  Textarea,
  Field,
  CloseButton,
} from "@chakra-ui/react";
import {
  createRef,
  useEffect,
  useLayoutEffect,
  useState,
  type FormEvent,
  type JSX,
} from "react";
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

import PriceCategorySlider from "@components/PriceCategorySlider";
import ActivityMultiSelect from "@components/ActivityMultiSelect";
import WaypointTextField from "@components/WaypointTextField";
import type Route from "@models/trip";
import type { TripFormArgs } from "@hooks/trip";

type TripFormDialogProps = {
  trip?: Route;
  triggerButton: JSX.Element;
  upsertTrip: (args: TripFormArgs) => void;
};
const TripFormDialog = (props: TripFormDialogProps) => {
  const { trip, triggerButton, upsertTrip } = props;

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

  const descriptionTextAreaRef = createRef<HTMLTextAreaElement>();

  useLayoutEffect(() => {
    if (descriptionTextAreaRef.current) {
      descriptionTextAreaRef.current.style.resize = "none";
      descriptionTextAreaRef.current.style.height = "auto";
      const scrollHeight = descriptionTextAreaRef.current.scrollHeight || 58;
      descriptionTextAreaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [descriptionTextAreaRef]);

  useEffect(() => {
    if (trip) {
      const {
        name,
        description = "",
        priceCategory = 0,
        activities = [],
        waypoints = [],
      } = trip;
      setName(name);
      setDescription(description);
      setPriceCategory(priceCategory);
      setActivities(activities);
      setWaypoints(
        waypoints.map((waypoint) => ({ id: Math.random(), text: waypoint }))
      );
    }
  }, [
    trip,
    setName,
    setDescription,
    setPriceCategory,
    setActivities,
    setWaypoints,
  ]);

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

  const handleSubmit = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    const formattedWaypoints = waypoints
      .map((waypoint) => waypoint.text)
      .filter(Boolean);
    upsertTrip({
      name,
      description,
      priceCategory,
      activities,
      waypoints: formattedWaypoints,
    });
    setIsOpen(false);
  };

  const resetFields = () => {
    if (trip) {
      setName(trip.name);
      setDescription(trip.description || "");
      setPriceCategory(trip.priceCategory);
      setActivities(trip.activities || []);
      setWaypoints(
        trip.waypoints.map((waypoint) => ({
          id: Math.random(),
          text: waypoint,
        }))
      );
    } else {
      setName("");
      setDescription("");
      setPriceCategory(0);
      setActivities([]);
      setWaypoints([
        { id: Math.random(), text: "" },
        { id: Math.random(), text: "" },
      ]);
    }
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
      placement="center"
      size="lg"
      scrollBehavior="inside"
      modal={false}
      unmountOnExit
    >
      <Dialog.Trigger asChild>{triggerButton}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            as="form"
            onSubmit={handleSubmit}
            bgColor={{ _light: "orange/60", _dark: "gray.950/60" }}
            backdropFilter="blur(5px)"
          >
            <Dialog.CloseTrigger asChild>
              <CloseButton
                color="white"
                colorPalette="red"
                _hover={{ bgColor: { _light: "white" }, color: "red" }}
              />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title color="white">
                {trip ? "Edit" : "Create"} Trip
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body display="flex" flexDirection="column" gap={5}>
              <Field.Root orientation="horizontal" required>
                <Field.Label color="white">
                  Name <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  variant="subtle"
                />
              </Field.Root>
              <Field.Root orientation="horizontal">
                <Field.Label color="white">Description</Field.Label>
                <Textarea
                  ref={descriptionTextAreaRef}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  variant="subtle"
                  resize="none"
                />
              </Field.Root>
              <ActivityMultiSelect
                activities={activities}
                setActivities={setActivities}
              />
              <PriceCategorySlider
                priceCategory={priceCategory}
                setPriceCategory={setPriceCategory}
              />
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
                        isMaxWaypointsReached={waypoints.length > 26}
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
                <Button
                  onClick={resetFields}
                  variant="ghost"
                  colorPalette="red"
                >
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                type="submit"
                variant="solid"
                colorPalette="orange"
                color="white"
              >
                {trip ? "Save" : "Create"}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default TripFormDialog;
