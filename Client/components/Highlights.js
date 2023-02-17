import { Text, View, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Children} from "react";
import { Link, useTheme } from "@react-navigation/native";
import LoadingGif from "./LoadingGif";

const Highlights = ({ data }) => {
  const { colors } = useTheme();

  if (!data) return <LoadingGif />

  return (
    <>
      <ScrollView>
        <View className="flex flex-wrap flex-row py-5 gap-1">
          {data?.length > 0 ? (
            Children.toArray(
              data.map(card => (
                <Link to={{ screen: "UserProfile", params: { user: card, title: card.name } }}>
                  <View
                    className="flex-1 flex items-center w-32 border border-black/5 rounded-lg overflow-hidden bg-white/10 pt-3"
                  >
                    {card.profile_pic ? (
                      <Image
                        style={{
                          height: 100,
                          width: 100,
                          resizeMode: "contain"
                        }}
                        source={{
                          uri: card.profile_pic
                        }}
                      />
                      ) : (
                        <Ionicons name="person-circle-outline" size={100} style={{height: 100, width: 100}} color={colors.text} />
                    )}

                    <View className="p-2">

                      <Text
                        numberOfLines={1}
                        style={{ color: colors.textGray }}
                        className="text-sm w-28"
                      >
                        De {card.city}
                      </Text>

                      {
                        Children.toArray(
                        card?.categories?.map(category => (
                          <Text className="bg-violet-700 text-white font-bold p-1 text-center capitalize">{category?.name}</Text>
                        ))
                        )
                      }

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
            <View className="flex justify-center items-center w-full">
              <Text className="py-3 px-4 text-center font-bold text-2xl text-white bg-violet-600">Sin Resultados.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Highlights;
