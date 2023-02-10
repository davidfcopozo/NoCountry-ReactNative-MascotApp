import { Text, View, Image, Pressable, ScrollView } from "react-native";
import { Link, useTheme } from "@react-navigation/native";

const Shortcuts = () => {
  const { colors } = useTheme();

  return (
    <View className="flex flex-wrap flex-row py-5 gap-4">
      <View className="gap-y-2">
        <View className="bg-pink-200 items-center p-4 rounded-xl">
          <Image
            style={{
              width: 55,
              height: 55,
              resizeMode: "contain"
            }}
            source={require("../assets/pet_haircut.png")}
          />
        </View>
        <Text className="text-center font-bold" style={{ color: colors.text }}>
          Corte de Pelo
        </Text>
      </View>

      <View className="gap-y-2">
        <View className="bg-pink-200 items-center p-4 rounded-xl">
          <Image
            style={{
              width: 55,
              height: 55,
              resizeMode: "contain"
            }}
            source={require("../assets/pet_walk.png")}
          />
        </View>
        <Text className="text-center font-bold" style={{ color: colors.text }}>
          Paseador
        </Text>
      </View>

      <View className="gap-y-2">
        <View className="bg-pink-200 items-center p-4 rounded-xl">
          <Image
            style={{
              width: 55,
              height: 55,
              resizeMode: "contain"
            }}
            source={require("../assets/pet_transport.png")}
          />
        </View>
        <Text className="text-center font-bold" style={{ color: colors.text }}>
          Transporte
        </Text>
      </View>

      <View className="gap-y-2">
        <View className="bg-pink-200 items-center p-4 rounded-xl">
          <Image
            style={{
              width: 55,
              height: 55,
              resizeMode: "contain"
            }}
            source={require("../assets/pet_care.png")}
          />
        </View>
        <Text className="text-center font-bold" style={{ color: colors.text }}>
          Cuidado
        </Text>
      </View>

      <View className="gap-y-2">
        <View className="bg-pink-200 items-center p-4 rounded-xl">
          <Image
            style={{
              width: 55,
              height: 55,
              resizeMode: "contain"
            }}
            source={require("../assets/pet_training.png")}
          />
        </View>
        <Text className="text-center font-bold" style={{ color: colors.text }}>
          Entrenamiento
        </Text>
      </View>
    </View>
  );
};

export default Shortcuts;
