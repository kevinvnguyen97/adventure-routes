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
import { ColorModeButton, useColorModeValue } from "@components/ui/color-mode";
import { useAuth } from "@utils/auth";
import { useNavigate } from "react-router-dom";
import UserAvatar from "@components/UserAvatar";
import { Tooltip } from "@components/ui/tooltip";

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
        <Popover.Positioner paddingTop={2}>
          <Popover.Content
            bgColor={{ _light: "orange.600/60", _dark: "gray.900/60" }}
            backdropFilter="blur(5px)"
          >
            <Popover.Body display="flex" flexDirection="column" color="white">
              <HStack justifyContent="space-between">
                <HStack gap={2} alignItems="center">
                  <UserAvatar fallbackProps={{ name: user?.username }} />
                  <VStack justifyContent="left" alignItems="start">
                    <Text fontWeight="bold">{fullName}</Text>
                    <Text>{user?.username}</Text>
                  </VStack>
                </HStack>
                <ButtonGroup>
                  <ColorModeButton
                    variant="ghost"
                    color="white"
                    _hover={{ _light: { bgColor: "orange.600" } }}
                  />
                  {user && (
                    <>
                      <Tooltip
                        content="Settings"
                        contentProps={{
                          _dark: {
                            color: "white",
                            bgColor: "var(--chakra-colors-bg-panel)",
                          },
                          _light: {
                            color: "white",
                            bgColor: "bg",
                          },
                        }}
                      >
                        <IconButton
                          onClick={() => navigate("settings")}
                          variant="ghost"
                          color="white"
                          _hover={{ _light: { bgColor: "orange.600" } }}
                        >
                          <LuSettings />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        content="Log Out"
                        contentProps={{
                          _dark: {
                            color: "white",
                            bgColor: "var(--chakra-colors-bg-panel)",
                          },
                          _light: {
                            color: "white",
                            bgColor: "orange.600",
                          },
                        }}
                      >
                        <IconButton
                          onClick={logoutUser}
                          variant="ghost"
                          color="white"
                          _hover={{ color: "red" }}
                        >
                          <LuLogOut />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </ButtonGroup>
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
    <Box
      padding={5}
      bgColor={navBarBgColor}
      borderRadius="var(--chakra-radii-l3)"
    >
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
            _hover={{
              _light: { bgColor: "orange.600" },
              _dark: { bgColor: "gray.800" },
            }}
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
