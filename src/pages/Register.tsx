import {
  Box,
  Input,
  Image,
  Button,
  Avatar,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  return (
    <VStack alignItems="center">
      <Image src="./large_logo.png" />
      <VStack
        as="form"
        onSubmit={() => {}}
        width={{ smToMd: "100%", md: 400 }}
        gap={5}
      >
        <HStack gap={2} alignItems="center">
          <Avatar.Root size="2xl" variant="subtle">
            <Avatar.Fallback
              name={[firstName, lastName].filter(Boolean).join(" ")}
            />
            <Avatar.Image />
          </Avatar.Root>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value.trim())}
            variant="subtle"
            placeholder="First Name"
            required
          />
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value.trim())}
            variant="subtle"
            placeholder="Last Name"
          />
        </HStack>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          variant="subtle"
          placeholder="Email"
        />
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
          variant="subtle"
          placeholder="Username"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="subtle"
          placeholder="Password"
          type="password"
        />
        <Input
          value={reEnterPassword}
          onChange={(e) => setReEnterPassword(e.target.value)}
          variant="subtle"
          placeholder="Re-Enter Password"
          type="password"
        />
        <Button variant="solid">Register</Button>
        <Button variant="ghost" onClick={() => navigate("/login")}>
          Existing user? Login here
        </Button>
      </VStack>
    </VStack>
  );
};

export default Register;
