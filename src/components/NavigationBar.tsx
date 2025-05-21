import { Box, Flex, IconButton, Avatar, Button, Image } from "@chakra-ui/react";
import { Menu } from "@mui/icons-material";

const NavigationBar = () => {
  return (
    <Box padding={5} bgColor="gray.900">
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
  );
};

export default NavigationBar;
