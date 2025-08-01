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
import { checkIsEmailValid } from "@utils/email";
import {
  checkIsPasswordRequirementsMet,
  getPasswordStrength,
} from "@utils/password";
import { useLayoutEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();

  // const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  const arePasswordsMatched = password === reEnterPassword;

  const isFormValid = [arePasswordsMatched, checkIsEmailValid(email)].every(
    Boolean
  );

  const checkIsPasswordValid = (passwordString: string) => {
    return (
      checkIsPasswordRequirementsMet(passwordString) && arePasswordsMatched
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

    if (!isFormValid) {
      return;
    }

    registerUser({
      firstName,
      lastName,
      email,
      username,
      phoneNumber,
      password,
    });
  };

  useLayoutEffect(() => {
    window.document.title = "Register - Adventure Routes";
  }, []);

  return (
    <VStack
      data-state="open"
      _open={{ animation: "fade-in 1s ease-out" }}
      alignItems="center"
    >
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
        <Field.Root required invalid={!!email && !checkIsEmailValid(email)}>
          <Field.Label color="white">
            Email <Field.RequiredIndicator />
          </Field.Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            variant="subtle"
          />
          <Field.ErrorText>Email must be valid</Field.ErrorText>
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
        <Field.Root required>
          <Field.Label color="white">
            Phone Number <Field.RequiredIndicator />
          </Field.Label>
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.trim())}
            variant="subtle"
            type="tel"
          />
        </Field.Root>
        <Field.Root
          required
          invalid={!!password && !checkIsPasswordValid(password)}
        >
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
          {password && (
            <PasswordStrengthMeter
              value={getPasswordStrength(password)}
              width="100%"
              color="white"
            />
          )}
        </Field.Root>
        <Field.Root
          required
          invalid={!!reEnterPassword && !checkIsPasswordValid(reEnterPassword)}
        >
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
          {reEnterPassword && (
            <PasswordStrengthMeter
              value={getPasswordStrength(reEnterPassword)}
              width="100%"
              color="white"
            />
          )}
        </Field.Root>
        <Button
          variant="solid"
          type="submit"
          colorPalette="orange"
          color="white"
          disabled={!isFormValid}
        >
          Register
        </Button>
        <Button
          variant="ghost"
          color="orange.fg"
          onClick={() => navigate("/login")}
        >
          Existing user? Login here
        </Button>
      </VStack>
    </VStack>
  );
};

export default Register;
