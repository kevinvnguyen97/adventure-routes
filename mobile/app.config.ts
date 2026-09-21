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
    icon: "./assets/images/small_logo.png",
    scheme: "mobile",
    userInterfaceStyle: "automatic",
    ios: {
      supportsTablet: true,
      icon: "./assets/images/small_logo.png",
      config: {
        googleMapsApiKey,
      },
      bundleIdentifier: "com.adventureroutes.mobile",
      infoPlist: {
        // UIApplicationSceneManifest: {
        //   UIApplicationSupportsMultipleScenes: false,
        //   UISceneConfigurations: {
        //     UIWindowSceneSessionRoleApplication: [
        //       {
        //         UISceneConfigurationName: "Default Configuration",
        //         UISceneDelegateClassName: "adventure-routes.SceneDelegate",
        //       },
        //     ],
        //   },
        // },
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
      // Temporary solution until Expo SDK 58 stable releases
      [
        "expo-build-properties",
        {
          ios: {
            enableSceneSupport: true,
          },
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
