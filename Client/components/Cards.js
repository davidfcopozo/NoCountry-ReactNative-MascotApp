import { Text, View, Image, Pressable, ScrollView } from "react-native";
import { Children, Fragment } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, useTheme } from "@react-navigation/native";

// Componente de Cards renderiza la info de cada mascotero ofreciendo su servicio

const Cards = ({ Data }) => {
  const { colors } = useTheme();

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="gap-x-3 py-2">
      {Children.toArray(
        Data?.map(card => (
          <Link to={{ screen: "Service", params: { user: card, title: card.name } }}>
            <View className="w-44 relative border border-black/5 rounded-lg overflow-hidden bg-white/10">
              <Image
                className="h-36"
                source={{
                  uri: card.image
                }}
              />

              <View className="p-2">
                <Text
                  numberOfLines={1}
                  style={{ color: colors.text }}
                  className="text-base font-semibold -mb-1"
                >
                  {card.service}
                </Text>

                <Text numberOfLines={1} style={{ color: colors.textGray }} className="text-sm">
                  De {card.location}
                </Text>

                <View className="flex flex-row py-2 justify-left items-left gap-x-2">
                  {card.user_picture ? (
                    <Image
                      style={{
                        width: 35,
                        height: 35,
                        resizeMode: "contain"
                      }}
                      className="rounded-full"
                      source={{
                        uri: card.user_picture
                      }}
                    />
                  ) : (
                    <Ionicons name="person-circle-outline" size={32} color={colors.text} />
                  )}
                  <View>
                    <Text style={{ color: colors.text }}>{card.name}</Text>
                    {card.stars ? (
                      <View className="flex flex-row items-center">
                        {Children.toArray(
                          Array.from(Array(card.stars)).map(star => (
                            <Ionicons name="star" size={10} color="#ffe100" />
                          ))
                        )}
                        <Text style={{ color: colors.text }} className="text-xs ml-1">
                          {card.clients ? "(" + card.clients + ")" : undefined}
                        </Text>
                      </View>
                    ) : undefined}
                  </View>
                </View>
              </View>
            </View>
          </Link>
        ))
      )}

      <Link to={{ screen: "Jobs" }}>
        <Pressable className="flex justify-center h-full items-center w-32 bg-slate-700/50 rounded-lg">
          <Text className="text-white text-lg font-bold">Ver Mas</Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
};

export default Cards;
