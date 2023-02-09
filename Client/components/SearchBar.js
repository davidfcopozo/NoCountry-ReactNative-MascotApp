import { View, TextInput, Modal } from "react-native";
import { SearchIcon } from "../components/Icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Filter from "./Filter";

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
        <Ionicons
          onPress={() => setOpenFilter(!openFilter)}
          size={32}
          name="options-outline"
        ></Ionicons>
      </View>

      <Modal animationType="slide" transparent={false} visible={openFilter}>
        <Filter openFilter={openFilter} setOpenFilter={setOpenFilter}></Filter>
      </Modal>
    </View>
  );
};

export default SearchBar;
