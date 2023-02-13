import { Text, View, Image, ScrollView } from "react-native";
import { Children } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, useTheme } from "@react-navigation/native";
import LoadingGif from "./LoadingGif";

const Highlights = ({ data }) => {
  const { colors } = useTheme();

  return (
    <>
      <ScrollView>
        <View className="flex flex-wrap flex-row py-5 gap-4 justify-center items-center">
          {data?.length ? (
            Children.toArray(
              data.map(card => (
                <Link to={{ screen: "Post", params: { user: card, title: card.name } }}>
                  <View
                    View
                    className="w-36 border border-black/5 rounded-lg overflow-hidden bg-white/10"
                  >
                    <Image
                      className="h-36"
                      source={{
                        uri: card.profile_pic
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

                      <Text
                        numberOfLines={1}
                        style={{ color: colors.textGray }}
                        className="text-sm"
                      >
                        De {card.city}
                      </Text>

                      <View className="flex flex-row py-2 justify-left items-left gap-x-2">
                        {card.profile_pic ? (
                          <Image
                            style={{
                              width: 35,
                              height: 35,
                              resizeMode: "contain"
                            }}
                            className="rounded-full"
                            source={{
                              uri: card.profile_pic
                            }}
                          />
                        ) : (
                          <Ionicons name="person-circle-outline" size={32} color={colors.text} />
                        )}
                        <View>
                          <Text style={{ color: colors.text }}>{card.name}</Text>
                          <View className="flex flex-row items-center">
                            {Children.toArray(
                              Array.from(Array(card.rating)).map(star => (
                                <Ionicons name="star" size={10} color="#ffe100" />
                              ))
                            )}
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </Link>
              ))
            )
          ) : (
            <LoadingGif />
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Highlights;
