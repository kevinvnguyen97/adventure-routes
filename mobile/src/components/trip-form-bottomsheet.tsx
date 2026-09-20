import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  useColorScheme,
  ViewStyle,
} from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import { RefObject, useCallback, useMemo, useRef, useState } from "react";
import { TripFormArgs } from "@shared/types/api";
import {
  BottomSheetModal,
  BottomSheetBackgroundProps,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { BlurTint, BlurView } from "expo-blur";
import { Colors, ColorTheme } from "@shared/constants/color";
import { BottomTabInset } from "@/constants/theme";

const BlurredBackground = (props: BottomSheetBackgroundProps) => {
  const { style } = props;
  const colorScheme = useColorScheme();
  const theme = useTheme();

  const backgroundColor: StyleProp<ViewStyle> = {
    backgroundColor: theme.background,
    shadowOpacity: 0.1,
  };

  return (
    <BlurView
      intensity={25}
      tint={colorScheme === "unspecified" ? "default" : colorScheme}
      style={[style, backgroundColor]}
    />
  );
};

const Backdrop = (props: any) => {
  return (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1} // Hides backdrop when sheet is closed
      appearsOnIndex={0} // Shows backdrop at the first snap point
      opacity={0.3} // Control how dark you want the background (0.0 to 1.0)
    />
  );
};

type TripFormBottomSheetProps = {
  bottomSheetRef: RefObject<BottomSheetModal | null>;
  upsertTrip: (args: TripFormArgs) => void;
};
export default function TripFormBottomSheet(props: TripFormBottomSheetProps) {
  const { upsertTrip, bottomSheetRef } = props;
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

  const snapPoints = useMemo(() => ["50%", "75%"], []);

  const handleBottomSheetChanges = useCallback((index: number) => {
    console.log("Handling bottom sheet changes:", index);
  }, []);

  const handleSubmit = () => {
    upsertTrip({ name, description, activities, priceCategory, waypoints });
  };

  return (
    <BottomSheetModal
      index={0}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backgroundComponent={BlurredBackground}
      backdropComponent={Backdrop}
      onChange={handleBottomSheetChanges}
      enableDismissOnClose
      handleIndicatorStyle={{ backgroundColor: Colors.WHITE }}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
    >
      <BottomSheetView
        style={{ gap: 10, padding: 20, paddingBottom: BottomTabInset }}
      >
        <ThemedText style={{ fontSize: 25 }}>Create Trip</ThemedText>
        <BottomSheetTextInput
          value={name}
          onChangeText={setName}
          style={textInputStyle}
          placeholder="Name"
        />
        <BottomSheetTextInput
          value={description}
          onChangeText={setDescription}
          style={textInputStyle}
          placeholder="Description"
          multiline
          numberOfLines={3}
        />
        {waypoints.map((waypoint, i) => (
          <BottomSheetTextInput
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
        <Pressable onPress={handleSubmit} style={styles.button}>
          <ThemedText>Create Trip</ThemedText>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
  },
  blurredBackground: {},
  button: {
    padding: 10,
    backgroundColor: "#f97316",
    borderRadius: 5,
    width: 150,
    alignItems: "center",
    alignSelf: "center",
  },
});
