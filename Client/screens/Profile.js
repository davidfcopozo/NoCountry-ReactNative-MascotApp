import { useEffect, useState } from "react";
import { Text, View, Modal, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useTheme } from "@react-navigation/native";
import Register from "./Register";
import Login from "./Login";
import { useSelector } from "react-redux";

const Profile = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const { colors } = useTheme();
  const { currentUser, loading } = useSelector(state => state.users);

  useEffect(() => {
    if (currentUser && loading === false) {
      setOpenLogin(false);
    }
  }, [currentUser]);

  return (
    <ScrollView>
      <Modal
        animationType="slide"
        transparent={false}
        visible={openLogin}
        onRequestClose={() => {
          setOpenLogin(!openLogin);
        }}
      >
        <ScrollView>
          <View className="flex justify-center w-full">
            <View
              style={{ color: colors.text, backgroundColor: colors.background }}
              className="pt-5 px-5 h-full border-t border-black/10"
            >
              <View className="flex justify-between flex-row items-center">
                <Ionicons
                  onPress={() => setOpenLogin(!openLogin)}
                  name="md-close-sharp"
                  size={34}
                  color={colors.text}
                />
                <Text className="font-bold">Iniciar Sesión</Text>
                <Text className="w-10"></Text>
              </View>
              <Login />
            </View>
          </View>
        </ScrollView>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={openRegister}
        onRequestClose={() => {
          setOpenRegister(!openRegister);
        }}
      >
        <ScrollView>
          <View className="flex justify-center w-full">
            <View
              style={{ color: colors.text, backgroundColor: colors.background }}
              className="pt-5 px-5 h-full border-t border-black/10"
            >
              <View className="flex justify-between flex-row items-center">
                <Ionicons
                  onPress={() => setOpenRegister(!openRegister)}
                  name="md-close-sharp"
                  size={34}
                  color={colors.text}
                />
                <Text className="font-bold">Registrarme</Text>
                <Text className="w-10"></Text>
              </View>
              <Register />
            </View>
          </View>
        </ScrollView>
      </Modal>

      <View className="flex gap-y-2 py-6">
        <Pressable
          style={{ borderColor: colors.text }}
          className="border p-4 w-32 mx-auto rounded-sm"
          onPress={() => setOpenLogin(true)}
        >
          <Text style={{ color: colors.text }} className="font-bold text-center">
            Iniciar Sesión
          </Text>
        </Pressable>

        <Pressable
          className="bg-violet-700 p-4 w-32 mx-auto rounded-sm"
          onPress={() => setOpenRegister(true)}
        >
          <Text className="text-white font-bold text-center">Registrarme</Text>
        </Pressable>

        <Pressable
          style={{ color: colors.text, borderColor: colors.text }}
          className="border p-4 w-32 mx-auto rounded-sm"
        >
          <Link to={{ screen: "AboutUs" }}>
            <Text style={{ color: colors.text }} className="flex text-center">
              Acerca de Nosotros
            </Text>
          </Link>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Profile;
