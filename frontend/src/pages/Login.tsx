import { Input, Image, Button, VStack, Field } from "@chakra-ui/react";
import { PasswordInput } from "@components/ui/password-input";
import { useAuth } from "@utils/auth";
import { useLayoutEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = [usernameOrEmail, password].every(Boolean);

  const loginSubmit = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    loginUser({ usernameOrEmail, password });
  };

  useLayoutEffect(() => {
    window.document.title = "Login - Adventure Routes";
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
        onSubmit={loginSubmit}
        width={{ smDown: "100%", sm: 400 }}
        gap={3}
      >
        <Field.Root required>
          <Field.Label color="white">
            Username or Email <Field.RequiredIndicator />
          </Field.Label>
          <Input
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            variant="subtle"
          />
        </Field.Root>
        <Field.Root required>
          <Field.Label color="white">
            Password <Field.RequiredIndicator />
          </Field.Label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="subtle"
            type="password"
          />
        </Field.Root>
        <Button
          variant="solid"
          type="submit"
          colorPalette="orange"
          color="white"
          disabled={!isFormValid}
        >
          Login
        </Button>
        <Button
          variant="ghost"
          color="orange.fg"
          onClick={() => navigate("/register")}
        >
          New user? Register here
        </Button>
      </VStack>
    </VStack>
  );
};

export default Login;
