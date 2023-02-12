import React, { useState, useEffect, useRef, memo } from "react";
import { View, Text, StyleSheet, TextInput, Platform, Pressable } from "react-native";
import { useColorScheme } from "nativewind";
import { SendIcon } from "./Icons";
import { useTheme } from "@react-navigation/native";

const ChatInput = ({ reply, isLeft, username }) => {
  const [message, setMessage] = useState("");
  const { colors } = useTheme();
  return (
    <View className="justify-center bg-black dark:bg-white w-[80%] rounded-bl-full rounded-tl-full border border-gray-500/30">
      {reply ? (
        <View className="px-2 justify-center align-start">
          <Pressable className="absolute right-2 top-1"></Pressable>
          <Text className="mt-1 font-bold">Response to {isLeft ? username : "Me"}</Text>
          <Text className="mt-1">{reply}</Text>
        </View>
      ) : null}
      <View className="w-full h-full -auto px-2 mx-2 flex-row ">
        <TextInput
          multiline
          placeholder={"Escribe algo..."}
          className="bg-transparent w-full h-full py-4 justify-center text-black text-sm  "
          value={message}
          onChangeText={text => setMessage(text)}
        />
      </View>
    </View>
  );
};

export default ChatInput;
