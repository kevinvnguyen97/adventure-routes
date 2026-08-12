import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView>
        <ThemedText>Settings</ThemedText>
        <Pressable onPress={() => console.log("Sign Out")}>
          <ThemedText>Sign Out</ThemedText>
        </Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}
