const googleMapsApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

if (!googleMapsApiKey) {
  throw new Error(
    "EXPO_PUBLIC_GOOGLE_MAPS_API_KEY must be set to configure Google Maps.",
  );
}

const config = {
  expo: {
    name: "adventure-routes",
    slug: "adventure-routes",
    version: "1.0.0",
    orientation: "default",
    icon: "./assets/images/icon.png",
    scheme: "mobile",
    userInterfaceStyle: "automatic",
    ios: {
      icon: "./assets/expo.icon",
      config: {
        googleMapsApiKey,
      },
      bundleIdentifier: "com.adventureroutes.mobile",
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          "This app needs your location to find waypoints in your saved trips.",
        NSLocationAlwaysAndWhenInUseUsageDescription:
          "This app needs your location to find waypoints in your saved trips.",
      },
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      predictiveBackGestureEnabled: false,
      package: "com.adventureroutes.mobile",
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#FFA500",
          image: "./assets/images/splash-icon.png",
          imageWidth: 76,
        },
      ],
      [
        "react-native-maps",
        {
          androidGoogleMapsApiKey: googleMapsApiKey,
          iosGoogleMapsApiKey: googleMapsApiKey,
        },
      ],
      "expo-image",
      "expo-secure-store",
      "expo-web-browser",
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  },
};

export default config;
