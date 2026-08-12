import * as Device from "expo-device";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";

export default function Dashboard() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView>
        <ThemedText>Hello</ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}
