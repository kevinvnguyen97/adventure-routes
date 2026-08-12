import { useState } from "react";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function SignIn() {
  const navigate = useRouter();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

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
          style={styles.textInput}
          value={usernameOrEmail}
          onChangeText={setUsernameOrEmail}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.pressedButton : {},
          ]}
          onPress={() => console.log("Hello")}
        >
          <ThemedText>Sign In</ThemedText>
        </Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = {
  textInput: {
    backgroundColor: "white",
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
