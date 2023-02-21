import { Text, View, ScrollView, Image } from "react-native";
import { Children, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import CardsData from "../db/cards.json";
import { Link, useTheme } from "@react-navigation/native";

import { useSelector } from "react-redux";

const Messages = () => {
  const { colors } = useTheme();

  if (!CardsData)
    return (
      <View style={{ color: colors.text }} className="justify-center mx-auto flex-1">
        <Text className="text-3xl font-bold align-center justify-center">
          No tienes conversaciones
        </Text>
      </View>
    );
  return (
    <ScrollView className="p-5 gap-y-5">
      <Text style={{ color: colors.text }} className="text-3xl font-bold">
        Mensajes
      </Text>

      {Children.toArray(
        CardsData.map(user => (
          <Link to={{ screen: "Message", params: { user: user, title: user.name } }}>
            <View className="flex flex-row items-center gap-x-5">
              {user.user_picture ? (
                <Image
                  style={{
                    width: 85,
                    height: 85,
                    resizeMode: "contain"
                  }}
                  source={{
                    uri: user.user_picture
                  }}
                  className="rounded-full"
                />
              ) : (
                <Ionicons name="person-circle-outline" size={82} color={colors.text} />
              )}

              <View className="gap-y-2 items-start">
                <Text style={{ color: colors.text }} className="font-bold text-xl">
                  {user.name}
                </Text>
                <Text style={{ color: colors.textGray }}>Ultimo Mensaje</Text>
              </View>
            </View>
          </Link>
        ))
      )}
    </ScrollView>
  );
};

export default Messages;
