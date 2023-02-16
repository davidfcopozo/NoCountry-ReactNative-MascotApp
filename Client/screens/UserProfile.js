import { useState } from "react";
import {
  Text,
  View,
  Modal,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  TextInput
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useTheme } from "@react-navigation/native";
import { Children } from "react";

const UserProfile = ({route}) => {

  const colorScheme = "light";
  const { colors } = useTheme();

  const user = route.params.user

  const userLogged = false;
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <View className="h-full w-full p-5 gap-y-5">
      <View className="flex flex-row justify-start gap-x-4 w-full">
        {user.profile_pic ? (
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
        ) : (
          <View className="rounded-full bg-white">
            <Ionicons
              name="person-circle-outline"
              size={100}
              fill={colorScheme === "dark" ? "#fff" : "#000"}
            />
          </View>
        )}
        <View className="flex flex-col gap-y-2">
          <Text style={{ color: colors.text }} className="text-2xl font-bold -mb-1">
            {user.name} {user.surname}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.textGray }} className="text-sm -mb-1">
            {user.city}
          </Text>
          {user.rating ? (
            <View className="flex flex-row items-center">
              {Children.toArray(
                Array.from(Array(user.rating)).map(star => (
                  <Ionicons name="star" size={10} color="#ffe100" />
                ))
              )}
              <Text style={{ color: colors.textGray }} className="text-xs ml-1">
                {user.rating ? "(" + user.rating + ")" : undefined}
              </Text>
            </View>
          ) : (
            <Text className="text-xs text-white p-1 font-bold bg-violet-600 w-28 text-center rounded-sm">
              Usuario Nuevo
            </Text>
          )}

          {
            userLogged?
            <View className="flex flex-row gap-x-2">
              <Pressable
                style={{ color: colors.text, borderColor: colors.text }}
                className="border"
              >
                <Link to={{ screen: "Edit" }} style={{padding: 8}} >
                  <Text style={{ color: colors.text }} className="text-sm font-bold">
                    Editar perfil
                  </Text>
                </Link>
              </Pressable>
              <Pressable
                style={{ color: colors.text, borderColor: colors.text }}
                className="border"
              >
                <Link to={{ screen: "Favorites" }} style={{padding: 8}}>
                  <Text style={{ color: colors.text }} className="text-sm font-bold">
                    Favoritos
                  </Text>
                </Link>
              </Pressable>
            </View>
            :
            undefined
          }

        </View>
      </View>

      <View className="mt-8">
        <Text style={{ color: colors.text }} className="text-xl mb-1 font-bold">
          Sobre mi
        </Text>
        <Text style={{ color: colors.text }} className="text-base">
          {user.description}
        </Text>
      </View>

      <View>
        <Text style={{ color: colors.text }} className="text-xl font-bold mb-1">
          Servicios
        </Text>

        <View className="flex justify-start flex-row items-center gap-x-3">
          <Text className="text-base p-2 text-white bg-violet-700 rounded-2xl">{user?.service}</Text>
        </View>
      </View>

      {
        userLogged?
        <View className="flex justify-center items-center">
          <TouchableOpacity className="bg-violet-700 py-2 px-4 rounded-lg">
            <Text className="text-xl text-white">Cerrar sesion</Text>
          </TouchableOpacity>
        </View>
        :
        undefined
      }
    </View>
  );
};

export default UserProfile;
