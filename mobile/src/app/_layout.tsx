import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar, useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";
import { ThemedText } from "@/components/themed-text";
import { SessionProvider } from "@/context/auth";

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={theme}>
      <StatusBar barStyle="light-content" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Protected guard={false}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>
        <Stack.Protected guard={true}>
          <Stack.Screen name="sign-in" />
        </Stack.Protected>
        <Stack.Protected guard={true}>
          <Stack.Screen name="register" />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}

export default function Root() {
  return (
    <SessionProvider>
      <AnimatedSplashOverlay />
      <RootNavigator />
    </SessionProvider>
  );
}
