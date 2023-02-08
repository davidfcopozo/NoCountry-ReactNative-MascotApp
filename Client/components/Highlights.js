import { Text, View, Image, Pressable, ScrollView } from "react-native";
import { Children } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

const Highlights = ({ Data }) => {
  const { colorScheme } = useColorScheme();

  return (
    <>
      <ScrollView>
        <View
          style={{ marginLeft: "auto", marginRight: "auto" }}
          className="flex flex-wrap flex-row py-5 gap-3 w-full"
        >
          {Children.toArray(
            Data?.map(card => (
              <Link
                to={{
                  screen: "Post",
                  params: { user: card, title: card.name }
                }}
              >
                <View className="w-44 relative border-[1px] border-black/5 rounded-sm dark:bg-slate-300/10">
                  <Image
                    className="h-36"
                    source={{
                      uri: card.image
                    }}
                  />

                  <View className="p-2">
                    <Text
                      numberOfLines={1}
                      className="text-base font-semibold -mb-1 dark:text-white"
                    >
                      {card.service}
                    </Text>

                    <Text
                      numberOfLines={1}
                      className="text-sm text-gray-500 dark:text-white/70"
                    >
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
                        <Ionicons
                          name="person-circle-outline"
                          size={32}
                          color={colorScheme === "dark" ? "#fff" : "#000"}
                        />
                      )}
                      <View>
                        <Text className="text-black dark:text-white">
                          {card.name}
                        </Text>
                        {card.stars ? (
                          <View className="flex flex-row items-center">
                            {Children.toArray(
                              Array.from(Array(card.stars)).map(star => (
                                <Ionicons
                                  name="star"
                                  size={10}
                                  color="#ffe100"
                                />
                              ))
                            )}
                            <Text className="text-xs text-gray-500 ml-1 dark:text-white/70">
                              {card.clients
                                ? "(" + card.clients + ")"
                                : undefined}
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
        </View>
      </ScrollView>
    </>
  );
};

export default Highlights;
