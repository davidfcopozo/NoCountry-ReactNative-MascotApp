import { View, Text, ScrollView, TextInput, TouchableOpacity, Keyboard } from "react-native";
import React from "react";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const FormEditProfile = () => {
  const colorScheme = "light";
  const { colors } = useTheme();
  const { currentUser } = useSelector(state => state.users);
  const user = currentUser?.data;
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    description: "",
    profile_pic: "",
    services: []
  });

  const handleChange = name => {
    if (name) {
      return val => {
        setFormData({ ...formData, [name]: val });
        setValid({ ...valid, [name]: true });
      };
    } else setValid({ ...valid, [name]: false });
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setTimeout(() => {
      alert(JSON.stringify(formData, null, 2));
    }, 100);
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View>
        <View className="p-5">
          <View>
            <View className="flex items-center">
              {user.profile_pic ? (
                <View>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: "contain"
                    }}
                    className="rounded-full"
                    source={{
                      uri: user.profile_pic
                    }}
                  />
                </View>
              ) : (
                <View className="rounded-full bg-white flex items-center">
                  <Ionicons
                    name="person-circle-outline"
                    size={100}
                    fill={colorScheme === "dark" ? "#fff" : "#000"}
                  />
                </View>
              )}
            </View>
            <View className="mb-5 px-28" style={{ color: colors.text, borderColor: colors.text }}>
              <TouchableOpacity className="flex justify-center items-center bg-violet-700 py-2 rounded-lg">
                <Text className="text-white">Subir foto</Text>
              </TouchableOpacity>
            </View>
            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Nombre
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  onChangeText={handleChange("name")}
                />
              </View>
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Email
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  onChangeText={handleChange("email")}
                />
              </View>
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Ubicación
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  onChangeText={handleChange("city")}
                />
              </View>
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Sobre mi
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  onChangeText={handleChange("description")}
                />
              </View>
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Servicios
              </Text>
              <View style={{ color: colors.text, borderColor: colors.text }}>
                {user.offers_services ? (
                  <Text
                    className="text-base"
                    style={{ color: colors.text, borderColor: colors.text }}
                  >
                    SI ofreces servicios
                  </Text>
                ) : (
                  <Text
                    className="text-base"
                    style={{ color: colors.text, borderColor: colors.text }}
                  >
                    No ofreces servicios
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>

        <View className="px-5">
          <TouchableOpacity
            className="flex justify-center items-center bg-violet-700 py-2 rounded-lg"
            onPress={handleSubmit}
          >
            <Text className="text-lg text-white">Actualizar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default FormEditProfile;
