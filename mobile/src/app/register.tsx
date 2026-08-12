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

export default function Register() {
  const navigate = useRouter();
  const theme = useTheme();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  const textInputStyle: StyleProp<TextStyle> = [
    styles.textInput,
    { backgroundColor: theme.backgroundElement, color: theme.fieldText },
  ];

  return (
    <ThemedView
      style={{
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
        <ThemedView style={{ flexDirection: "row", gap: 10 }}>
          <TextInput
            placeholder="First Name"
            style={[textInputStyle, { flex: 1 }]}
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            placeholder="Last Name"
            style={[textInputStyle, { flex: 1 }]}
            value={lastName}
            onChangeText={setLastName}
          />
        </ThemedView>
        <TextInput
          placeholder="Email"
          style={textInputStyle}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          inputMode="email"
        />
        <TextInput placeholder="Username" style={textInputStyle} />
        <TextInput
          placeholder="Phone Number"
          style={textInputStyle}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          inputMode="tel"
        />
        <TextInput
          placeholder="Password"
          style={textInputStyle}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Re-Enter Password"
          style={textInputStyle}
          secureTextEntry
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.pressedButton : {},
          ]}
          onPress={() => console.log("Hello")}
        >
          <ThemedText>Register</ThemedText>
        </Pressable>
        <Pressable
          style={{ alignSelf: "center", padding: 20 }}
          onPress={() => navigate.navigate("/sign-in")}
        >
          <ThemedText
            themeColor="text"
            style={{ color: "red", fontWeight: "bold" }}
          >
            Existing user? Sign in here
          </ThemedText>
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
