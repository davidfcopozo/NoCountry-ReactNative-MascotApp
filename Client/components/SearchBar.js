import { View, TextInput, Modal } from "react-native";
import { Link, useTheme } from "@react-navigation/native";
import { SearchIcon } from "../components/Icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Filter from "./Filter";

const SearchBar = () => {
  const { colors } = useTheme();

  const [openFilter, setOpenFilter] = useState(false);
  const [input, setInput] = useState("");

  const handleInput = event => {
    event.preventDefault();
    setInput(event.nativeEvent.text);
  };

  return (
    <View className="flex flex-row justify-center items-center p-7 pr-14">
      <View className="left-12">
        <SearchIcon color={colors.text}></SearchIcon>
      </View>
      <TextInput
        style={{ color: colors.text, borderColor: colors.text }}
        className="rounded-lg p-3 pl-14 border"
        placeholder="Buscar en MascotApp"
        onChange={handleInput}
        placeholderTextColor={colors.textGray}
      ></TextInput>
      <View className="pl-4">
        <Ionicons
          onPress={() => setOpenFilter(!openFilter)}
          size={32}
          name="options-outline"
          color={colors.text}
        ></Ionicons>
      </View>

      <Modal animationType="slide" transparent={false} visible={openFilter}>
        <Filter openFilter={openFilter} setOpenFilter={setOpenFilter}></Filter>
      </Modal>
    </View>
  );
};

export default SearchBar;
