import { Box, Input, Image, Button } from "@chakra-ui/react";
import { useState, type ChangeEvent, type FormEvent } from "react";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const loginUser = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Image src="./large_logo.png" />
      <Box
        as="form"
        onSubmit={loginUser}
        width={{ smToMd: "100%", md: 400 }}
        display="flex"
        flexDirection="column"
        gap={5}
      >
        <Input
          value={username}
          onChange={onUsernameChange}
          variant="subtle"
          placeholder="Username or Email"
        />
        <Input
          value={password}
          onChange={onPasswordChange}
          variant="subtle"
          placeholder="Password"
        />
        <Button variant="solid">Login</Button>
        <Button variant="subtle">New user? Register here</Button>
      </Box>
    </Box>
  );
};
