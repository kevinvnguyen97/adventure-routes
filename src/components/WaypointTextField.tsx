import {
  Field,
  InputGroup,
  IconButton,
  Input,
  ButtonGroup,
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

  return (
    <Field.Root
      orientation="horizontal"
      ref={setNodeRef}
      transform={CSS.Transform.toString(transform)}
      transition={transition}
      opacity={isDragging ? 0.5 : 1}
      touchAction="none"
      required={isOrigin || isDestination}
    >
      <Field.Label>
        {isOrigin
          ? "Origin"
          : isDestination
          ? "Destination"
          : `Stop #${stopNumber}`}{" "}
        {(isOrigin || isDestination) && <Field.RequiredIndicator />}
      </Field.Label>
      <InputGroup
        startElement={<LuMapPin />}
        endAddonProps={{ variant: "subtle", paddingLeft: 0, paddingRight: 0 }}
        endAddon={
          <ButtonGroup gap={0}>
            {hasMoreWaypoints && (
              <IconButton
                onClick={removeWaypoint}
                variant="ghost"
                color="red"
                colorPalette="red"
                size="xs"
              >
                <LuMinus />
              </IconButton>
            )}
            <IconButton
              onClick={addWaypoint}
              variant="ghost"
              color={{ _light: "green", _dark: "lightgreen" }}
              colorPalette="green"
              size="xs"
            >
              <LuPlus />
            </IconButton>
            <IconButton
              {...attributes}
              {...listeners}
              variant="ghost"
              color={{ _light: "black", _dark: "white" }}
              size="xs"
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
        }
      >
        <Input
          value={waypoint.text}
          onChange={(e) => onWaypointChange(e.target.value)}
          placeholder="Enter address or place of interest"
          variant="subtle"
        />
      </InputGroup>
    </Field.Root>
  );
};

export default WaypointTextField;
