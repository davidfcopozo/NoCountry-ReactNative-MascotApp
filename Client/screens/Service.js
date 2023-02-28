import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, useTheme, useNavigation } from "@react-navigation/native";
import { Children } from "react";
import { useSelector } from "react-redux";

const Service = ({ route }) => {
  const { currentUser } = useSelector(state => state.users);
  const user = route.params.user;
  const colorScheme = "light";
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <ScrollView>
      <Image
        className="h-56"
        source={{
          uri: user.image
        }}
      />
      <View
        style={{ color: colors.text, borderColor: colors.text }}
        className="flex flex-row justify-between items-center py-4 px-6 border-b"
      >
        <View>
          <Text style={{ color: colors.text }} className="font-semibold text-lg">
            {user.service}
          </Text>
        </View>
        <View>
          <Text style={{ color: colors.text }} className="font-bold text-lg">
            ${user.price}
          </Text>
        </View>
      </View>
      <View
        style={{ color: colors.text, borderColor: colors.text }}
        className="flex flex-row items-center justify-between py-4 px-7 border-b"
      >
        <Link to={{ screen: "Post", params: { user: user } }}>
          <View className="flex flex-row items-center">
            <View>
              {user.profile_pic ? (
                <View className="flex items-center">
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      resizeMode: "contain"
                    }}
                    className="rounded-full"
                    source={{
                      uri: user.profile_pic
                    }}
                  />
                </View>
              ) : (
                <View className="rounded-full bg-white flex">
                  <Ionicons
                    name="person-circle-outline"
                    size={60}
                    fill={colorScheme === "dark" ? "#fff" : "#000"}
                  />
                </View>
              )}
            </View>
            <View className="flex pl-3 pb-1" style={{ color: colors.text }}>
              <Text className="font-semibold text-lg">{user.name}</Text>
              <Text
                numberOfLines={1}
                style={{ color: colors.textGray }}
                className="text-base mb-1 font-semibold"
              >
                {user.city}
              </Text>
              {user.rating ? (
                <View className="flex flex-row items-center">
                  {Children.toArray(
                    Array.from(Array(user.rating)).map(star => (
                      <Ionicons name="star" size={13} color="#ffe100" />
                    ))
                  )}
                  <Text style={{ color: colors.textGray }} className="text-xs ml-1">
                    {user.clients ? "(" + user.clients + ")" : undefined}
                  </Text>
                </View>
              ) : (
                <Text className="text-white p-1 font-bold bg-violet-600 w-28 mt-1 text-center rounded-sm">
                  Usuario Nuevo
                </Text>
              )}
            </View>
          </View>
        </Link>
        <View>
          <Link
            to={
              currentUser?.data?.id ? { screen: "Message", params: { user } } : { screen: "Perfil" }
            }
          >
            <View
              style={{ color: colors.text, borderColor: colors.text }}
              className="border-2 px-8 py-1"
            >
              <Text
                style={{ color: colors.text, borderColor: colors.text }}
                className="font-bold text-sm"
              >
                Chat
              </Text>
            </View>
          </Link>
        </View>
      </View>
      <View className="py-3 px-3">
        <Text style={{ color: colors.text }} className="font-semibold">
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem
          Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un
          impresor.
        </Text>
      </View>
      <View
        className="flex flex-row justify-center items-center gap-x-10 mt-7 mb-7
      "
      >
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                currentUser?.data?.id ? { name: "Request", params: { user } } : { name: "Perfil" }
              )
            }
            className="flex flex-row justify-center items-center bg-violet-700 py-2 px-5 rounded-lg"
          >
            <Text className="text-xl text-white">Contratar</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                currentUser?.data?.id ? { name: "Review", params: { user } } : { name: "Perfil" }
              )
            }
            className="flex flex-row justify-center items-center bg-violet-700 py-2 px-5 rounded-lg"
          >
            <Text className="text-xl text-white">Calificar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Service;
