import "./App.css";
import { Box, Flex, IconButton, Button, Image, Avatar } from "@chakra-ui/react";
import { Menu } from "@mui/icons-material";

function App() {
  return (
    <Box width="100%" padding={5}>
      <Box padding={5} width="100%" bgColor="gray.900">
        <Flex h={5} alignItems="center" justifyContent="space-between">
          <IconButton variant="ghost" md={{ display: "none" }} size="xl">
            <Menu />
          </IconButton>
          <Image src="/small_logo.png" width={20} height="auto" />
          <Avatar.Root
            as={Button}
            variant="solid"
            bgColor="gray.800"
            color="white"
          >
            <Avatar.Fallback />
            <Avatar.Image />
          </Avatar.Root>
        </Flex>
      </Box>
    </Box>
  );
}

export default App;
