import {
  Input,
  Image,
  Button,
  Avatar,
  HStack,
  VStack,
  Field,
} from "@chakra-ui/react";
import { checkIsPasswordRequirementsMet } from "@utils/password";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  const arePasswordsMatched = password === reEnterPassword;

  const checkIsPasswordValid = (passwordString: string) => {
    return (
      checkIsPasswordRequirementsMet(passwordString) || arePasswordsMatched
    );
  };

  const getPasswordInvalidMessage = (passwordString: string) => {
    if (passwordString.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!arePasswordsMatched) {
      return "Passwords do not match";
    }
  };

  return (
    <VStack alignItems="center">
      <Image src="./large_logo.png" />
      <VStack
        as="form"
        onSubmit={() => {}}
        width={{ smDown: "100%", sm: 400 }}
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
        <Field.Root invalid={!checkIsPasswordValid(password)}>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="subtle"
            placeholder="Password"
            type="password"
          />
          <Field.ErrorText>
            {getPasswordInvalidMessage(password)}
          </Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!checkIsPasswordValid(reEnterPassword)}>
          <Input
            value={reEnterPassword}
            onChange={(e) => setReEnterPassword(e.target.value)}
            variant="subtle"
            placeholder="Re-Enter Password"
            type="password"
          />
          <Field.ErrorText>
            {getPasswordInvalidMessage(reEnterPassword)}
          </Field.ErrorText>
        </Field.Root>
        <Button variant="solid">Register</Button>
        <Button variant="ghost" onClick={() => navigate("/login")}>
          Existing user? Login here
        </Button>
      </VStack>
    </VStack>
  );
};

export default Register;
