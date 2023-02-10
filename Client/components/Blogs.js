import { Text, View, Image, Pressable, ScrollView } from "react-native";
import { Children } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";

// Componente de Blog renderiza la info de cada mascotero y su articulo

const Blogs = ({ Data }) => {

  return (
    <>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="gap-x-3 py-2"
      >
        {Children.toArray(
          Data?.map(blog => (
            <Link to={{screen: "BlogPost", params: { blog } }}>
              <View className="w-60">
                <Image
                  className="h-36 rounded-lg"
                  source={{
                    uri: blog.image
                  }}
                />
                <View className="absolute w-full rounded-b-lg bottom-0 p-2 bg-slate-800/50">
                  <Text className="text-white">{blog.title}</Text>
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
