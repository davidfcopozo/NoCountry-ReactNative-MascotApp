import { Text, View, ScrollView, Image, Pressable } from "react-native";
import Cards from "../components/Cards";
import Shortcuts from "../components/Shortcuts";
import CardsData from "../db/cards.json";
import Blogs from "../components/Blogs";
import BlogsData from "../db/blogs.json";

const Index = () => {
  return (
    <ScrollView>
      <View className="text-left w-full p-3">
        <Shortcuts />

        <Text className="font-bold text-2xl mb-2 dark:text-white">
          Mascoteros cerca de tí
        </Text>
        <Cards Data={CardsData} />

        <Text className="font-bold text-2xl mb-2 dark:text-white">Blogs</Text>
        <Blogs Data={BlogsData}></Blogs>
      </View>
    </ScrollView>
  );
};

export default Index;
