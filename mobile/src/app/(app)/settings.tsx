import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useSession } from "@/context/auth";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const { signOut } = useSession();

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView>
        <ThemedText>Settings</ThemedText>
        <Pressable onPress={signOut}>
          <ThemedText>Sign Out</ThemedText>
        </Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}
