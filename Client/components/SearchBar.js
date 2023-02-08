import { View, TextInput, Button, Image, Pressable, Modal, ScrollView } from "react-native";
import { SearchIcon } from "../components/Icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const SearchBar = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [input, setInput] = useState("");

  const handleInput = event => {
    event.preventDefault();
    setInput(event.nativeEvent.text);
  };

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
        onChange={handleInput}
      ></TextInput>
      <View className="pl-4">
        <Ionicons onPress={() => setOpenFilter(true)} size={32} name="options-outline"></Ionicons>
      </View>
    </View>
  );
};

export default SearchBar;
