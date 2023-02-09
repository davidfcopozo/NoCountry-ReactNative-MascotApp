import { Text, View, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import Highlights from "../components/Highlights";
import CardsData from "../db/cards.json";
import Filter from "../components/Filter";
import { Ionicons } from "@expo/vector-icons";

const Search = () => {
  return (
    <ScrollView>
      <View className=" w-full p-2">
        <SearchBar></SearchBar>
        <View className="mt-3">
          <Text className="font-bold text-2xl mb-2 pl-2 dark:text-white">Los mas destacados</Text>
          <Highlights Data={CardsData} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Search;
