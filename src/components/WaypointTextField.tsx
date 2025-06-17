import { useState } from "react";
import {
  Field,
  InputGroup,
  IconButton,
  Input,
  ButtonGroup,
  CloseButton,
} from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import {
  LuMapPin,
  LuMinus,
  LuPlus,
  LuArrowDownUp,
  LuArrowDown,
  LuArrowUp,
} from "react-icons/lu";
import { CSS } from "@dnd-kit/utilities";
import { Autocomplete } from "@react-google-maps/api";

type ClearWaypointInputButtonProps = {
  clearWaypointInput: () => void;
};
const ClearWaypointInputButton = ({
  clearWaypointInput,
}: ClearWaypointInputButtonProps) => {
  return (
    <CloseButton
      onClick={clearWaypointInput}
      variant="ghost"
      size="xs"
      color={{ _dark: "white" }}
    />
  );
};

type WaypointTextFieldProps = {
  waypoint: WaypointInput;
  stopNumber: number;
  isOrigin?: boolean;
  isDestination?: boolean;
  hasMoreWaypoints?: boolean;
  addWaypoint: () => void;
  removeWaypoint: () => void;
  onWaypointChange: (newWaypointValue: string) => void;
};
const WaypointTextField = (props: WaypointTextFieldProps) => {
  const {
    waypoint,
    stopNumber,
    isOrigin,
    isDestination,
    hasMoreWaypoints,
    addWaypoint,
    removeWaypoint,
    onWaypointChange,
  } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: waypoint.id });

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    console.log("Place changed");
    if (autocomplete) {
      const place = autocomplete.getPlace();
      console.log("Selected place:", place);
      onWaypointChange(place.formatted_address || place.name || "");
    }
  };

  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <Field.Root
        orientation="horizontal"
        ref={setNodeRef}
        transform={CSS.Transform.toString(transform)}
        transition={transition}
        opacity={isDragging ? 0.5 : 1}
        touchAction="none"
        required={isOrigin || isDestination}
      >
        <Field.Label color="white">
          {isOrigin
            ? "Origin"
            : isDestination
            ? "Destination"
            : `Stop #${stopNumber}`}{" "}
          {(isOrigin || isDestination) && <Field.RequiredIndicator />}
        </Field.Label>
        <InputGroup
          startElement={<LuMapPin />}
          endElement={
            <ClearWaypointInputButton
              clearWaypointInput={() => onWaypointChange("")}
            />
          }
        >
          <Input
            value={waypoint.text}
            onChange={(e) => onWaypointChange(e.target.value)}
            placeholder="Enter address or place of interest"
            variant="subtle"
            width="100%"
            colorPalette="orange"
          />
        </InputGroup>
        <ButtonGroup gap={0}>
          {hasMoreWaypoints && (
            <IconButton
              onClick={removeWaypoint}
              variant="ghost"
              color="white"
              size="xs"
              _hover={{ bgColor: { _light: "orange.600" } }}
            >
              <LuMinus />
            </IconButton>
          )}
          <IconButton
            onClick={addWaypoint}
            variant="ghost"
            color="white"
            size="xs"
            _hover={{ bgColor: { _light: "orange.600" } }}
          >
            <LuPlus />
          </IconButton>
          <IconButton
            {...attributes}
            {...listeners}
            variant="ghost"
            color="white"
            size="xs"
            _hover={{ bgColor: { _light: "orange.600" } }}
          >
            {isOrigin ? (
              <LuArrowDown />
            ) : isDestination ? (
              <LuArrowUp />
            ) : (
              <LuArrowDownUp />
            )}
          </IconButton>
        </ButtonGroup>
      </Field.Root>
    </Autocomplete>
  );
};

export default WaypointTextField;
