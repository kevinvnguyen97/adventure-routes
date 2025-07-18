import { VStack, Text, HStack, Table, IconButton } from "@chakra-ui/react";
import UserAvatar from "@components/UserAvatar";
import { useAuth } from "@utils/auth";
import { useLayoutEffect } from "react";
import { LuPencil } from "react-icons/lu";

const Settings = () => {
  const { user } = useAuth();

  const { firstName, lastName, username, email } = user || {};

  const name = [firstName, lastName].filter(Boolean).join(" ");

  useLayoutEffect(() => {
    window.document.title = "Settings - Adventure Routes";
  }, []);

  return (
    <VStack
      data-state="open"
      _open={{ animation: "fade-in 1s ease-out" }}
      marginTop={5}
    >
      <UserAvatar
        fallbackProps={{ name: user?.username }}
        variant="subtle"
        _hover={{ cursor: "pointer" }}
        size="2xl"
      />
      <Table.Root width={500} variant="outline" size="lg">
        <Table.Row>
          <Table.Cell fontWeight="bold">Name</Table.Cell>
          <Table.Cell>{name}</Table.Cell>
          <Table.Cell>
            <IconButton variant="subtle">
              <LuPencil />
            </IconButton>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell fontWeight="bold">Username</Table.Cell>
          <Table.Cell>{username}</Table.Cell>
          <Table.Cell>
            <IconButton variant="subtle">
              <LuPencil />
            </IconButton>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell fontWeight="bold">Email</Table.Cell>
          <Table.Cell>{email}</Table.Cell>
          <Table.Cell>
            <IconButton variant="subtle">
              <LuPencil />
            </IconButton>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell fontWeight="bold">Phone Number</Table.Cell>
          <Table.Cell>(708)000-0000</Table.Cell>
          <Table.Cell>
            <IconButton variant="subtle">
              <LuPencil />
            </IconButton>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell fontWeight="bold">Password</Table.Cell>
          <Table.Cell>********</Table.Cell>
          <Table.Cell>
            <IconButton variant="subtle">
              <LuPencil />
            </IconButton>
          </Table.Cell>
        </Table.Row>
      </Table.Root>
    </VStack>
  );
};
export default Settings;
