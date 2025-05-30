import { Input, Image, Button, VStack } from "@chakra-ui/react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    try {
      const token = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      console.log("TOKEN:", token);
    } catch (error) {
      const loginError = error as Error;
      console.error("Login failed:", loginError.message);
    }
  };

  return (
    <VStack alignItems="center">
      <Image src="./large_logo.png" />
      <VStack
        as="form"
        onSubmit={loginUser}
        width={{ smDown: "100%", sm: 400 }}
        gap={5}
      >
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="subtle"
          placeholder="Username or Email"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="subtle"
          placeholder="Password"
          type="password"
        />
        <Button variant="solid" type="submit">
          Login
        </Button>
        <Button variant="ghost" onClick={() => navigate("/register")}>
          New user? Register here
        </Button>
      </VStack>
    </VStack>
  );
};

export default Login;
