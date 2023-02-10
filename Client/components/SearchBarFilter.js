import { View, TextInput, Button, Image, Pressable, Modal, ScrollView } from "react-native";
import { Link, useTheme } from "@react-navigation/native";
import { SearchIcon } from "../components/Icons";
import { useState } from "react";

const SearchBarFilter = () => {
  const { colors } = useTheme();

  const [openFilter, setOpenFilter] = useState(false);
  const [input, setInput] = useState("");

  const handleInput = event => {
    event.preventDefault();
    setInput(event.nativeEvent.text);
  };

  return (
    <View className="flex flex-row items-center">
      <View className="absolute left-3">
        <SearchIcon color={colors.text}></SearchIcon>
      </View>
      <TextInput
        style={{ color: colors.text, borderColor: colors.text }}
        className="p-2 pl-12 rounded-md border"
        placeholder="Ciudad"
        onChange={handleInput}
        placeholderTextColor={colors.textGray}
      ></TextInput>
    </View>
  );
};

export default SearchBarFilter;
