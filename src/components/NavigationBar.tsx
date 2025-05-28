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

const TMP_USERNAME = "Placeholder";

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
  const { token } = useAuth();
  const [isUserPopoverOpen, setIsUserPopoverOpen] = useState(false);

  const onUserPopoverChange = () => {
    setIsUserPopoverOpen(!isUserPopoverOpen);
  };
  return (
    <Popover.Root open={isUserPopoverOpen} onOpenChange={onUserPopoverChange}>
      <Popover.Trigger disabled={!token}>
        <UserAvatar
          fallbackProps={{ name: TMP_USERNAME }}
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
                paddingBottom={5}
              >
                <Box display="flex" gap={2} alignItems="center">
                  <UserAvatar fallbackProps={{ name: TMP_USERNAME }} />
                  <Text fontWeight="bold">{TMP_USERNAME}</Text>
                </Box>
                <ColorModeButton colorPalette="gray" />
              </Box>
              <Separator />
              <Button variant="ghost" colorPalette="gray">
                <Settings />
                Settings
              </Button>
              <Separator />
              <Button variant="ghost" color="red" colorPalette="red">
                <Logout />
                Log Out
              </Button>
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
        <IconButton variant="ghost" md={{ display: "none" }} size="xl">
          <MenuIcon />
        </IconButton>
        <Image src="/small_logo.png" width={20} height="auto" />
        <UserPopover />
      </Flex>
    </Box>
  );
};

export default NavigationBar;
