import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./themed-text";
import Trip from "@shared/models/trip";
import { useTheme } from "@/hooks/use-theme";

type TripCardProps = {
  trip: Trip;
};
export default function TripCard(props: TripCardProps) {
  const { trip } = props;
  const { _id: tripId, name } = trip;
  const theme = useTheme();

  const tripCardContainerStyle: StyleProp<ViewStyle> = [
    styles.tripCardContainer,
    { backgroundColor: theme.backgroundElement },
  ];

  return (
    <Pressable style={tripCardContainerStyle} onPress={() => {}}>
      <View>
        <ThemedText
          key={tripId.toString()}
          style={{ fontSize: 20, fontWeight: "bold" }}
        >
          {name}
        </ThemedText>
      </View>
      <View>
        <ThemedText>X</ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tripCardContainer: {
    padding: 10,
    borderRadius: 5,
    color: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
