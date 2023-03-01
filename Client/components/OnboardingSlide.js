import { useTheme } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import { View, Image, Text } from "react-native";

const OnboardingSlide = ({ item }) => {
  const { height, width } = useWindowDimensions();
  const { colors } = useTheme();
  return (
    <View className="align-center mb-4" style={{ width }}>
      <Image source={item?.image} style={{ width, resizeMode: "contain" }} className="h-[75%]" />

      <View className="self-center">
        <Text
          style={{ color: colors.text }}
          className="text-base font-bold mt-5 text-center max-w-[75%]"
        >
          {item?.title}
        </Text>
        <Text
          style={{ color: colors.text }}
          className="text-xs mt-2 text-center max-w-[70%] leading-6"
        >
          {item?.description}
        </Text>
      </View>
    </View>
  );
};

export default OnboardingSlide;
