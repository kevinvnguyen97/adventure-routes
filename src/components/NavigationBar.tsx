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
          <Popover.Content colorPalette="orange">
            <Popover.Arrow />
            <Popover.Body display="flex" flexDirection="column">
              <Box
                display="flex"
                justifyContent="space-between"
                paddingBottom={user ? 5 : 0}
              >
                <Box display="flex" gap={2} alignItems="center">
                  <UserAvatar fallbackProps={{ name: user?.username }} />
                  <Text fontWeight="bold">{user?.username}</Text>
                </Box>
                <ColorModeButton colorPalette="gray" />
              </Box>
              {user && (
                <>
                  <Separator />
                  <Button
                    onClick={onUserPopoverChange}
                    variant="ghost"
                    colorPalette="gray"
                  >
                    <Settings />
                    Settings
                  </Button>
                  <Separator />
                  <Button
                    onClick={() => {
                      logoutUser();
                      onUserPopoverChange();
                    }}
                    variant="ghost"
                    color="red"
                    colorPalette="red"
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
