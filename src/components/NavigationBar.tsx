import {
  Box,
  Flex,
  IconButton,
  Image,
  Popover,
  Portal,
  Text,
  VStack,
  HStack,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { LuLogOut, LuSettings, LuMenu } from "react-icons/lu";
import { useState } from "react";
import { useColorModeValue } from "@components/ui/color-mode";
import { useAuth } from "@utils/auth";
import { useNavigate } from "react-router-dom";
import UserAvatar from "@components/UserAvatar";

const UserPopover = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [isUserPopoverOpen, setIsUserPopoverOpen] = useState(false);

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  const onUserPopoverChange = () => {
    setIsUserPopoverOpen(!isUserPopoverOpen);
  };
  return (
    <Popover.Root open={isUserPopoverOpen} onOpenChange={onUserPopoverChange}>
      <Popover.Trigger>
        <UserAvatar
          fallbackProps={{ name: user?.username }}
          variant="subtle"
          _hover={{ cursor: "pointer" }}
        />
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            colorPalette="orange"
            css={{
              "--popover-bg": { _light: "#F97316" },
            }}
          >
            <Popover.Arrow>
              <Popover.ArrowTip borderColor={{ _light: "orange.600" }} />
            </Popover.Arrow>
            <Popover.Body display="flex" flexDirection="column" color="white">
              <HStack justifyContent="space-between">
                <HStack gap={2} alignItems="center">
                  <UserAvatar fallbackProps={{ name: user?.username }} />
                  <VStack justifyContent="left" alignItems="start">
                    <Text fontWeight="bold">{fullName}</Text>
                    <Text>{user?.username}</Text>
                  </VStack>
                </HStack>
                {user && (
                  <ButtonGroup>
                    <IconButton
                      onClick={() => navigate("settings")}
                      variant="ghost"
                      color="white"
                      _hover={{ _light: { bgColor: "orange.600" } }}
                    >
                      <LuSettings />
                    </IconButton>
                    <IconButton
                      onClick={logoutUser}
                      variant="ghost"
                      color="white"
                      _hover={{ color: "red" }}
                    >
                      <LuLogOut />
                    </IconButton>
                  </ButtonGroup>
                )}
              </HStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

const NavigationBar = () => {
  const navBarBgColor = useColorModeValue("orange.500", "gray.900");
  const navigate = useNavigate();

  return (
    <Box padding={5} bgColor={navBarBgColor}>
      <Flex h={5} alignItems="center" justifyContent="space-between">
        <IconButton
          variant="ghost"
          color="white"
          smDown={{ display: "block" }}
          sm={{ display: "none" }}
          size="xl"
        >
          <LuMenu />
        </IconButton>
        <HStack>
          <Image src="/small_logo.png" width={20} height="auto" />
          <Button
            variant="ghost"
            color="white"
            smDown={{ display: "none" }}
            sm={{ display: "block" }}
            size="lg"
            onClick={() => navigate("/")}
            _hover={{ _light: { bgColor: "orange.600" } }}
          >
            Dashboard
          </Button>
        </HStack>
        <UserPopover />
      </Flex>
    </Box>
  );
};

export default NavigationBar;
