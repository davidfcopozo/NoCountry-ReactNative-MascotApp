import { View, ScrollView, TextInput, Button, Image } from "react-native";
import { SearchIcon } from "../components/Icons";

const SearchBar = () => {
  return (
    <View
      style={{ marginLeft: "auto", marginRight: "auto" }}
      className="flex flex-row justify-center items-center p-7 h-20 pr-14"
    >
      <View className="left-12">
        <SearchIcon></SearchIcon>
      </View>
      <TextInput
        className="rounded-full p-4 pl-14 border"
        placeholder="Buscar en MascotApp"
      ></TextInput>
    </View>
  );
};

export default SearchBar;
