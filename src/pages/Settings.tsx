import { VStack, Text } from "@chakra-ui/react";
import { ColorModeButton } from "@components/ui/color-mode";
import UserAvatar from "@components/UserAvatar";
import { useAuth } from "@utils/auth";
import { useLayoutEffect } from "react";

const Settings = () => {
  const { user } = useAuth();

  useLayoutEffect(() => {
    window.document.title = "Settings - Adventure Routes";
  }, []);

  return (
    <VStack data-state="open" _open={{ animation: "fade-in 1s ease-out" }}>
      <UserAvatar
        fallbackProps={{ name: user?.username }}
        variant="subtle"
        _hover={{ cursor: "pointer" }}
        size="2xl"
      />
      <Text color="white">
        {[user?.firstName, user?.lastName].filter(Boolean).join(" ")}
      </Text>
      <ColorModeButton
        color="white"
        _hover={{ bgColor: { _light: "orange.600" } }}
      />
    </VStack>
  );
};
export default Settings;
