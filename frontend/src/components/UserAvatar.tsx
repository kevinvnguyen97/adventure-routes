import {
  type AvatarRootProps,
  type AvatarFallbackProps,
  Avatar,
} from "@chakra-ui/react";

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

export default UserAvatar;
