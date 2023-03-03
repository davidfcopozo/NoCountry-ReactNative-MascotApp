import { useTheme } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import { View, Image, Text } from "react-native";

const OnboardingSlide = ({ image, title, description }) => {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  return (
    <View className="align-center mb-4" style={{ width }}>
      <Image source={image} style={{ width, resizeMode: "contain" }} className="h-[75%]" />

      <View className="self-center">
        <Text
          style={{ color: colors.text }}
          className="text-base font-bold mt-5 text-center max-w-[75%]"
        >
          {title}
        </Text>
        <Text
          style={{ color: colors.text }}
          className="text-xs mt-2 text-center max-w-[70%] leading-6"
        >
          {description}
        </Text>
      </View>
    </View>
  );
};

export default OnboardingSlide;
