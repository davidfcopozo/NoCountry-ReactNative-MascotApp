import { Text, View, ScrollView, Image, Pressable } from "react-native";
import { Link, useTheme } from "@react-navigation/native";

const Home = () => {
  const { colors } = useTheme();

  return (
    <>
      <ScrollView>
        <View className="w-full">
          <View className="flex flex-row justify-between px-5 pt-6">
            <Pressable className="hover:border-b-2 hover:border-b-gray-900">
              <Text style={{ color: colors.text }} className="font-bold">
                Servicios contratados
              </Text>
            </Pressable>
            <Pressable className="hover:border-b-2 hover:border-b-gray-900">
              <Text style={{ color: colors.text }} className="font-bold">
                Servicios brindados
              </Text>
            </Pressable>
          </View>
          <View className="flex justify-center items-center">
            <Pressable className="flex items-center justify-center p-3 rounded-lg mt-36 bg-violet-700">
              <Text className="flex justify-center font-bold text-xl text-white">
                Ofrece tus servicios
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Home;
