import { Text, View, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import CardsData from "../db/cards.json";
import Highlights from "../components/Highlights";
import { Link, useTheme } from "@react-navigation/native";

const Search = () => {
  const { colors } = useTheme();

  return (
    <ScrollView>
      <View className="p-2">
        <SearchBar></SearchBar>
        <View className="mt-3">
          <Text style={{ color: colors.text }} className="font-bold text-2xl mb-2 pl-3">
            Los mas destacados
          </Text>
          <Highlights Data={CardsData} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Search;
