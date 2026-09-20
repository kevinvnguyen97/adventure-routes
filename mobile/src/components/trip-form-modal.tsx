import {
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
} from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import { TripFormArgs } from "@shared/types/api";

type TripFormModalProps = {
  isVisible: boolean;
  onClose: () => void;
  upsertTrip: (args: TripFormArgs) => void;
};
export default function TripFormModal(props: TripFormModalProps) {
  const { isVisible, onClose, upsertTrip } = props;
  const theme = useTheme();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [activities, setActivities] = useState<string[]>([]);
  const [priceCategory, setPriceCategory] = useState(0);
  const [waypoints, setWaypoints] = useState<string[]>(["", ""]);

  const textInputStyle: StyleProp<TextStyle> = [
    styles.textInput,
    { backgroundColor: theme.fieldTextBackground, color: theme.fieldText },
  ];

  const handleSubmit = () => {
    upsertTrip({ name, description, activities, priceCategory, waypoints });
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
      focusable
      allowSwipeDismissal
      presentationStyle="formSheet"
      backdropColor={theme.background}
      style={{ padding: 20, paddingTop: 30 }}
    >
      <ThemedView style={{ gap: 10 }}>
        <ThemedText style={{ fontSize: 25 }}>Create Trip</ThemedText>
        <TextInput
          value={name}
          onChangeText={setName}
          style={textInputStyle}
          placeholder="Name"
        />
        <TextInput
          value={description}
          onChangeText={setDescription}
          style={textInputStyle}
          placeholder="Description"
          multiline
          numberOfLines={3}
        />
        {waypoints.map((waypoint, i) => (
          <TextInput
            key={i}
            placeholder={i === 0 ? "Origin" : "Destination"}
            value={waypoint}
            onChangeText={(newWaypointValue) => {
              const newWaypoints = waypoints.map((oldWaypoint, j) =>
                i === j ? newWaypointValue : oldWaypoint,
              );
              setWaypoints(newWaypoints);
            }}
            style={textInputStyle}
          />
        ))}
        <Pressable onPress={handleSubmit}>
          <ThemedText>Create Trip</ThemedText>
        </Pressable>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
  },
});
