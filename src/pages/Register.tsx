import {
  Input,
  Image,
  Button,
  Avatar,
  HStack,
  VStack,
  Field,
} from "@chakra-ui/react";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@components/ui/password-input";
import { useAuth } from "@utils/auth";
import { checkIsPasswordRequirementsMet } from "@utils/password";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();

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

  const registerSubmit = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    registerUser({ firstName, lastName, email, username, password });
  };

  return (
    <VStack alignItems="center">
      <Image src="./large_logo.png" width={450} height="auto" />
      <VStack
        as="form"
        onSubmit={registerSubmit}
        width={{ smDown: "100%", sm: 400 }}
        gap={3}
      >
        <HStack gap={2} alignItems="center">
          <Avatar.Root size="2xl" variant="subtle">
            <Avatar.Fallback name={username} />
            <Avatar.Image />
          </Avatar.Root>
          <Field.Root required>
            <Field.Label color="white">
              First Name <Field.RequiredIndicator />
            </Field.Label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value.trim())}
              variant="subtle"
              required
            />
          </Field.Root>
          <Field.Root required>
            <Field.Label color="white">
              Last Name <Field.RequiredIndicator />
            </Field.Label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value.trim())}
              variant="subtle"
            />
          </Field.Root>
        </HStack>
        <Field.Root required>
          <Field.Label color="white">
            Email <Field.RequiredIndicator />
          </Field.Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            variant="subtle"
          />
        </Field.Root>
        <Field.Root required>
          <Field.Label color="white">
            Username <Field.RequiredIndicator />
          </Field.Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
            variant="subtle"
          />
        </Field.Root>
        <Field.Root required invalid={!checkIsPasswordValid(password)}>
          <Field.Label color="white">
            Password <Field.RequiredIndicator />
          </Field.Label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="subtle"
            type="password"
          />
          <Field.ErrorText>
            {getPasswordInvalidMessage(password)}
          </Field.ErrorText>
          {password && <PasswordStrengthMeter value={0} width="100%" />}
        </Field.Root>
        <Field.Root required invalid={!checkIsPasswordValid(reEnterPassword)}>
          <Field.Label color="white">
            Re-Enter Password <Field.RequiredIndicator />
          </Field.Label>
          <PasswordInput
            value={reEnterPassword}
            onChange={(e) => setReEnterPassword(e.target.value)}
            variant="subtle"
            type="password"
          />
          <Field.ErrorText>
            {getPasswordInvalidMessage(reEnterPassword)}
          </Field.ErrorText>
          {reEnterPassword && <PasswordStrengthMeter value={0} width="100%" />}
        </Field.Root>
        <Button variant="solid" type="submit">
          Register
        </Button>
        <Button variant="ghost" onClick={() => navigate("/login")}>
          Existing user? Login here
        </Button>
      </VStack>
    </VStack>
  );
};

export default Register;
