import { Text, View, ScrollView, Image, Pressable } from "react-native";
import Cards from "../components/Cards";
import Shortcuts from "../components/Shortcuts";
import CardsData from "../db/cards.json";
import Blogs from "../components/Blogs";
import BlogsData from "../db/blogs.json";
import { Link, useTheme } from "@react-navigation/native";

const Index = () => {
  const { colors } = useTheme();

  return (
    <ScrollView>
      <View className="text-left w-full p-3 px-6 gap-y-2">
        <Shortcuts navigate={false} />

        <Text style={{ color: colors.text }} className="font-bold text-2xl mb-2">
          Mascoteros cerca de ti
        </Text>

        <Cards Data={CardsData} />

        <Text style={{ color: colors.text }} className="font-bold text-2xl mb-2">
          Blogs
        </Text>
        <Blogs Data={BlogsData}></Blogs>
      </View>
    </ScrollView>
  );
};

export default Index;
