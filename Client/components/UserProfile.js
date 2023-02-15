import { useState } from "react";
import {
  Text,
  View,
  Modal,
  ScrollView,
  Pressable,
  TouchableOpacity,
  TextInput
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useTheme } from "@react-navigation/native";
import { Children } from "react";

const UserProfile = () => {
  const colorScheme = "light";
  const { colors } = useTheme();

  const [user, setUser] = useState({
    id: 1,
    image:
      "https://www.lavanguardia.com/files/content_image_mobile_filter/uploads/2022/05/21/628955615d048.jpeg",
    name: "Lautaro",
    lastName: "Santillan",
    service: "Paseo de Mascotas",
    price: "1000",
    stars: 5,
    info: "Disponible",
    user_picture: null,
    location: "Córdoba, Argentina",
    clients: 5,
    about:
      "Soy una persona responsable contrata mis servicios en mi perfil. Hago un servicio de calidad que te sorprenderá, dale crack"
  });

  const [openEdit, setOpenEdit] = useState(false);

  return (
    <View className="h-full">
      <View className="py-5 px-1 flex justify-center items-center">
        <View className="flex flex-row gap-x-4 items-center">
          {user.user_picture ? (
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain"
              }}
              className="rounded-full"
              source={{
                uri: user.user_picture
              }}
            />
          ) : (
            <View className="rounded-full bg-white">
              <Ionicons
                name="person-circle-outline"
                size={100}
                fill={colorScheme === "dark" ? "#fff" : "#000"}
              />
            </View>
          )}
          <View className="w-full flex flex-col">
            <Text style={{ color: colors.text }} className="text-2xl font-bold">
              {user.name} {user.lastName}
            </Text>
            <Text numberOfLines={1} style={{ color: colors.textGray }} className="text-sm mb-1">
              {user.location}
            </Text>
            {user.stars ? (
              <View className="flex flex-row items-center">
                {Children.toArray(
                  Array.from(Array(user.stars)).map(star => (
                    <Ionicons name="star" size={10} color="#ffe100" />
                  ))
                )}
                <Text style={{ color: colors.textGray }} className="text-xs ml-1">
                  {user.clients ? "(" + user.clients + ")" : undefined}
                </Text>
              </View>
            ) : (
              <Text className="text-xs text-white p-1 font-bold bg-violet-600 w-28 mt-1 text-center rounded-sm">
                Usuario Nuevo
              </Text>
            )}
            <View className="flex flex-row items-center gap-x-2 pt-2">
              <Pressable
                style={{ color: colors.text, borderColor: colors.text }}
                className="py-1 border"
              >
                <Link to={{ screen: "Edit" }}>
                  <View className="flex flex-row items-center">
                    <Text style={{ color: colors.text }} className="text-sm font-bold px-4">
                      Editar perfil
                    </Text>
                  </View>
                </Link>
              </Pressable>
              <Pressable
                style={{ color: colors.text, borderColor: colors.text }}
                className="py-1 border"
              >
                <Link to={{ screen: "Favorites" }}>
                  <View className="flex flex-row items-center">
                    <Text style={{ color: colors.text }} className="text-sm font-bold px-4">
                      Favoritos
                    </Text>
                  </View>
                </Link>
              </Pressable>
            </View>
          </View>
        </View>

        <View className="mt-8 pl-4">
          <Text style={{ color: colors.text }} className="text-xl mb-1 font-bold">
            Sobre mi
          </Text>
          <Text style={{ color: colors.text }} className="text-base">
            {user.about}
          </Text>
        </View>
      </View>

      <View className="">
        <Text style={{ color: colors.text }} className="text-xl font-bold pl-4">
          Servicios
        </Text>
        <View className="flex flex-row items-center gap-3 p-3">
          <Text className="text-base text-white bg-violet-700 rounded-2xl w-44 p-2 flex justify-center items-center">
            {user.service}
          </Text>
        </View>
      </View>

      <View className="pr-4 pl-6 flex justify-center">
        <TouchableOpacity className="flex flex-row justify-center items-center bg-violet-700 mt-16 mb-4 py-2 gap-x-2 rounded-lg">
          <Text className="text-xl text-white">Cerrar sesion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserProfile;
