import { Text, View, Image, Pressable, ScrollView } from "react-native";
import { Children } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../redux/actions";

const Highlights = ({ Data }) => {
  const { colors } = useTheme();

  const dispatch = useDispatch();
  const usersSort = useSelector(state => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <ScrollView>
        <View className="flex flex-wrap flex-row py-5 gap-4 justify-center items-center">
          {Children.toArray(
            Data?.map(card => (
              <Link to={{ screen: "Post", params: { user: card, title: card.name } }}>
                <View className="w-36 border border-black/5 rounded-lg overflow-hidden bg-white/10">
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
        </View>
      </ScrollView>
    </>
  );
};

export default Highlights;
