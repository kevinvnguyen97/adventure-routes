import {
  Box,
  Flex,
  IconButton,
  Avatar,
  Image,
  Popover,
  Portal,
  Text,
  type AvatarRootProps,
  type AvatarFallbackProps,
  Separator,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { Menu as MenuIcon, Settings, Logout } from "@mui/icons-material";
import { useState } from "react";
import { ColorModeButton, useColorModeValue } from "@components/ui";
import { useAuth } from "@utils/auth";

type UseAvatarProps = AvatarRootProps & {
  fallbackProps?: AvatarFallbackProps;
};
const UserAvatar = (props: UseAvatarProps) => {
  const { fallbackProps, ...avatarRootProps } = props;
  return (
    <Avatar.Root {...avatarRootProps}>
      <Avatar.Fallback {...fallbackProps} />
      <Avatar.Image />
    </Avatar.Root>
  );
};

const UserPopover = () => {
  const { user, logoutUser } = useAuth();
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
              <HStack
                justifyContent="space-between"
                paddingBottom={user ? 5 : 0}
              >
                <HStack gap={2} alignItems="center">
                  <UserAvatar fallbackProps={{ name: user?.username }} />
                  <VStack justifyContent="left" alignItems="start">
                    <Text fontWeight="bold">{fullName}</Text>
                    <Text>{user?.username}</Text>
                  </VStack>
                </HStack>
                <ColorModeButton
                  color="white"
                  _hover={{ _light: { bgColor: "orange.600" } }}
                />
              </HStack>
              {user && (
                <>
                  <Separator borderColor={{ _light: "orange.600" }} />
                  <Button
                    onClick={onUserPopoverChange}
                    variant="ghost"
                    color="white"
                    _hover={{ _light: { bgColor: "orange.600" } }}
                  >
                    <Settings />
                    Settings
                  </Button>
                  <Separator borderColor={{ _light: "orange.600" }} />
                  <Button
                    onClick={() => {
                      logoutUser();
                      onUserPopoverChange();
                    }}
                    variant="ghost"
                    color={{
                      _light: "red.700",
                      _dark: "red.500",
                      _hover: "white",
                    }}
                    colorPalette="red"
                    _hover={{ bgColor: "red.600" }}
                  >
                    <Logout />
                    Log Out
                  </Button>
                </>
              )}
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

const NavigationBar = () => {
  const navBarBgColor = useColorModeValue("orange.500", "gray.900");

  return (
    <Box padding={5} bgColor={navBarBgColor}>
      <Flex h={5} alignItems="center" justifyContent="space-between">
        <IconButton
          variant="ghost"
          smDown={{ display: "block" }}
          sm={{ display: "none" }}
          size="xl"
        >
          <MenuIcon />
        </IconButton>
        <Image src="/small_logo.png" width={20} height="auto" />
        <UserPopover />
      </Flex>
    </Box>
  );
};

export default NavigationBar;
