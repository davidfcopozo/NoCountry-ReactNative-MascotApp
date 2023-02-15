import { Text, View, ScrollView, Pressable, Modal } from "react-native";
import { useTheme } from "@react-navigation/native";
import FormService from "../components/FormService";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  const { colors } = useTheme();
  const [openForm, setOpenForm] = useState(false);

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
            <Pressable
              onPress={() => setOpenForm(!openForm)}
              className="flex items-center justify-center p-3 rounded-lg mt-36 bg-violet-700"
            >
              <Text className="flex justify-center font-bold text-xl text-white">
                Ofrece tus servicios
              </Text>
            </Pressable>
          </View>
          <Modal animationType="slide" transparent={false} visible={openForm}>
            <FormService openForm={openForm} setOpenForm={setOpenForm}></FormService>
          </Modal>
        </View>
      </ScrollView>
    </>
  );
};

export default Home;
