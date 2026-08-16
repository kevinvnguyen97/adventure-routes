import { useState } from "react";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  Image,
  TextInput,
  Pressable,
  StyleProp,
  TextStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/use-theme";
import { useSession } from "@/context/auth";

export default function SignIn() {
  const navigate = useRouter();
  const { signIn } = useSession();
  const theme = useTheme();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const textInputStyle: StyleProp<TextStyle> = [
    styles.textInput,
    { backgroundColor: theme.backgroundElement, color: theme.fieldText },
  ];

  const signInUser = () => {
    signIn({ usernameOrEmail, password });
  };

  return (
    <ThemedView
      style={{
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <SafeAreaView>
        <Image
          source={require("@/assets/images/large_logo.png")}
          style={{
            width: "100%",
            height: 200,
          }}
          resizeMode="contain"
        />
        <TextInput
          placeholder="Username or Email"
          style={textInputStyle}
          value={usernameOrEmail}
          onChangeText={setUsernameOrEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={textInputStyle}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.pressedButton : {},
          ]}
          onPress={signInUser}
        >
          <ThemedText>Sign In</ThemedText>
        </Pressable>
        <Pressable
          style={{ alignSelf: "center", padding: 20 }}
          onPress={() => navigate.navigate("/register")}
        >
          <ThemedText
            themeColor="text"
            style={{ color: "red", fontWeight: "bold" }}
          >
            New user? Register here
          </ThemedText>
        </Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = {
  textInput: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "#f97316",
    borderRadius: 5,
    width: 100,
    alignItems: "center",
    alignSelf: "center",
  },
  pressedButton: {
    opacity: 0.5,
  },
};
