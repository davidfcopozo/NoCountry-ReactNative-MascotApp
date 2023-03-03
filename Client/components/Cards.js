import { Text, View, Image, Pressable, ScrollView } from "react-native";
import { Children } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

// Componente de Cards renderiza la info de cada mascotero ofreciendo su servicio

const Cards = ({ Data }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="gap-x-3 py-2">
      {Data?.length ? (
        <>
          {Children.toArray(
            Data.map(card => (
              <Pressable
                onPress={() =>
                  navigation.navigate({ name: "VisitProfile", params: { user: card } })
                }
              >
                <View className="w-44 relative shadow-sm rounded-lg overflow-hidden bg-white/10">
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
                      {card.name} {card.surname}
                    </Text>

                    <Text numberOfLines={1} style={{ color: colors.textGray }} className="text-sm">
                      De {card.city}
                    </Text>

                    <View className="flex flex-row py-2 justify-left items-left gap-x-2">
                      {card.profile_pic ? (
                        <Image
                          style={{
                            width: 35,
                            height: 35,
                            resizeMode: "cover"
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
                        {card.rating ? (
                          <View className="flex flex-row items-center">
                            {Children.toArray(
                              Array.from(Array(card.rating)).map(star => (
                                <Ionicons name="star" size={10} color="#ffe100" />
                              ))
                            )}
                          </View>
                        ) : undefined}
                      </View>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))
          )}
          {/* <Link to={{ screen: "Jobs" }}>
            <Pressable className="flex justify-center h-full items-center w-32 bg-slate-700/50 rounded-lg">
              <Text className="text-white text-lg font-bold">Ver Mas</Text>
            </Pressable>
          </Link> */}
        </>
      ) : (
        <Text numberOfLines={1} style={{ color: colors.textGray }} className="text-sm">
          No hay usuarios en tu ciudad
        </Text>
      )}
    </ScrollView>
  );
};

export default Cards;
