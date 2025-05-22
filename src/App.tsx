import "./App.css";
import { Box, Image } from "@chakra-ui/react";
import NavigationBar from "@components/NavigationBar";
import Login from "@pages/Login";

const App = () => {
  return (
    <Box width="100%" padding={5}>
      <NavigationBar />
      <Login />
    </Box>
  );
};

export default App;
