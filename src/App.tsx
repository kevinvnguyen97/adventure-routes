import "./App.css";
import { Box } from "@chakra-ui/react";
import NavigationBar from "@components/NavigationBar";

const App = () => {
  return (
    <Box width="100%" padding={5}>
      <NavigationBar />
    </Box>
  );
};

export default App;
