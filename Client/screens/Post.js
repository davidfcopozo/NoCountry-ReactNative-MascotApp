import { View, Text, ScrollView, Image } from "react-native";
import { Children } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, useTheme } from "@react-navigation/native";

const Post = ({ route }) => {
  const user = route.params.user;
  const colorScheme = "light";
  const { colors } = useTheme();

  return (
    <ScrollView className="relative">
      <View className="p-5">
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
          <View>
            <Text style={{ color: colors.text }} className="text-2xl font-bold">
              {user.name} {user.surname}
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
          </View>
        </View>

        <View className="mt-5">
          <Text style={{ color: colors.text }} className="text-2xl mb-1 font-bold">
            Acerca de {user.name}
          </Text>
          <Text style={{ color: colors.text }} className="text-lg">
            {user.about}
          </Text>
        </View>
      </View>

      <View className="p-5">
        <Text style={{ color: colors.text }} className="text-2xl mb-3 font-bold">
          Servicios
        </Text>
      </View>
    </ScrollView>
  );
};

export default Post;
