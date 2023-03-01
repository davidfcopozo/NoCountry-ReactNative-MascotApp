import { useNavigation, useTheme } from "@react-navigation/native";
import { View, Text, Pressable, useWindowDimensions } from "react-native";

const OnboardingFooter = ({ currentSlideIndex, slides, skip, next }) => {
  const { colors } = useTheme();
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: height * 0.2
      }}
      className="justify-between px-5"
    >
      <View className="flex-row justify-center mt-5">
        {slides.map((_, index) => (
          <View
            key={index}
            className="h-2.5 w-2.5 bg-gray-500 mx-1 rounded-md"
            style={[
              { backgroundColor: colors.text },
              currentSlideIndex == index && {
                backgroundColor: colors.violet,
                width: 25
              }
            ]}
          />
        ))}
      </View>

      <View className="mb-5">
        {currentSlideIndex == slides.length - 1 ? (
          <View className="h-14">
            <Pressable
              onPress={() => navigation.navigate("Inicio")}
              className="flex-1 h-14 rounded-md justify-center align-center"
              style={{
                backgroundColor: colors.violet
              }}
            >
              <Text
                className="text-xs font-bold text-center"
                style={{
                  color: colors.background
                }}
              >
                EMPECEMOS
              </Text>
            </Pressable>
          </View>
        ) : (
          <View className="flex-row">
            <Pressable
              activeOpacity={0.8}
              className="flex-1 h-14 rounded-md justify-center align-center border-2"
              style={{
                borderColor: colors.text,
                backgroundColor: colors.background
              }}
              onPress={skip}
            >
              <Text
                style={{
                  color: colors.text
                }}
                className="text-xs font-bold text-center"
              >
                SALTAR
              </Text>
            </Pressable>
            <View className="w-5" />

            <Pressable
              activeOpacity={0.8}
              onPress={next}
              className="flex-1 h-14 rounded-md justify-center align-center"
              style={{
                backgroundColor: colors.violet
              }}
            >
              <Text
                className="text-xs font-bold text-center"
                style={{
                  color: colors.background
                }}
              >
                SIGUIENTE
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default OnboardingFooter;
