import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { getContrastTextColor } from "@utils/color";

type RoadSignProps = {
  bgColor: string;
  signText: string;
  distance?: string;
  duration?: string;
  width?: number | string;
};
const RoadSign = (props: RoadSignProps) => {
  const { bgColor, signText, width, distance, duration } = props;
  return (
    <Box
      bgColor={bgColor}
      padding={0.5}
      borderRadius={10}
      width={width}
      color={getContrastTextColor(bgColor)}
      fontFamily="Highway Gothic Wide"
      letterSpacing={2}
    >
      <VStack
        borderWidth={2}
        borderRadius={10}
        padding={2}
        borderColor={getContrastTextColor(bgColor)}
        justifyContent="space-between"
        alignItems="left"
      >
        <Text dangerouslySetInnerHTML={{ __html: signText }} />
        {(distance || duration) && (
          <HStack justifyContent="space-between" width="100%">
            <Text>{distance}</Text>
            <Text>{duration}</Text>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default RoadSign;
