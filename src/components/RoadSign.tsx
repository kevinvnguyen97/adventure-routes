import { Box, Text } from "@chakra-ui/react";
import { getContrastTextColor } from "@utils/color";

type RoadSignProps = {
  bgColor: string;
  signText: string;
  width?: number | string;
};
const RoadSign = (props: RoadSignProps) => {
  const { bgColor, signText, width } = props;
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
      <Box
        borderWidth={2}
        borderRadius={10}
        padding={2}
        borderColor={getContrastTextColor(bgColor)}
      >
        <Text dangerouslySetInnerHTML={{ __html: signText }} />
      </Box>
    </Box>
  );
};

export default RoadSign;
