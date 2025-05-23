import "./App.css";
import { Box } from "@chakra-ui/react";
import NavigationBar from "@components/NavigationBar";
import Login from "@pages/Login";

const App = () => {
  return (
    <Box width="100%" colorPalette="orange">
      <NavigationBar />
      <Login />
    </Box>
  );
};

export default App;
