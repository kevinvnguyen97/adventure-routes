import { Box, ProgressCircle } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
    >
      <ProgressCircle.Root
        value={null}
        size="lg"
        position="absolute"
        left={0}
        top={0}
        right={0}
        bottom={0}
      >
        <ProgressCircle.Circle>
          <ProgressCircle.Track />
          <ProgressCircle.Range />
        </ProgressCircle.Circle>
      </ProgressCircle.Root>
    </Box>
  );
};
export default Loading;
