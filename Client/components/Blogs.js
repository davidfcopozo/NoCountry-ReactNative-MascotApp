import { Text, View, Image, Pressable, ScrollView } from "react-native";
import { Children } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

// Componente de Cards renderiza la info de cada mascotero ofreciendo su servicio

const Blogs = ({ Data }) => {
  const { colorScheme } = useColorScheme();

  return (
    <>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="gap-x-3 py-2"
      >
        {Children.toArray(
          Data?.map(card => (
            <Link to={{ params: { title: card.title } }}>
              <View className="w-60 dark:bg-slate-300/10">
                <Image
                  className="h-36 rounded-lg"
                  source={{
                    uri: card.image
                  }}
                />
                <View className="absolute w-full rounded-b-lg bottom-0 p-2 bg-slate-800/50">
                  <Text className="text-white">{card.title}</Text>
                </View>
              </View>
            </Link>
          ))
        )}
      </ScrollView>
    </>
  );
};

export default Blogs;
