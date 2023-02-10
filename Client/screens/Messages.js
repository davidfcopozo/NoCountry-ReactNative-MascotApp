import { Text, View, ScrollView, Image } from "react-native";
import { Children } from "react";
import { Ionicons } from "@expo/vector-icons";
import CardsData from "../db/cards.json";
import { Link, useTheme } from "@react-navigation/native";

const Messages = () => {
  const { colors } = useTheme();

  return (
    <ScrollView className="p-5 gap-y-5">
      <Text style={{ color: colors.text }} className="text-3xl font-bold">
        Mensajes
      </Text>

      {Children.toArray(
        CardsData.map(user => (
          <Link to={{ screen: "Message", params: { user: user, title: user.name } }}>
            <View className="flex flex-row items-center gap-x-5">
              <View className="bg-white">
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
                  />
                ) : (
                  <Ionicons name="person-circle-outline" size={82} color="#000" />
                )}
              </View>

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
