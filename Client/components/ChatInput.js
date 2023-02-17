import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

const ChatInput = ({ reply, isReceived, username }) => {
  const [message, setMessage] = useState("");
  return (
    <View className="justify-center bg-white w-[80%] rounded-bl-full rounded-tl-full border border-gray-500/30">
      {reply ? (
        <View className="px-2 justify-center align-start">
          <Pressable className="absolute right-2 top-1"></Pressable>
          <Text className="mt-1 font-bold">Response to {isReceived ? username : "Me"}</Text>
          <Text className="mt-1">{reply}</Text>
        </View>
      ) : null}
      <View className="w-full h-full -auto px-2 mx-2 flex-row ">
        <TextInput
          multiline
          placeholder={"Escribe algo..."}
          className="bg-transparent w-full h-full py-3 justify-center text-black text-sm"
          value={message}
          onChangeText={text => setMessage(text)}
        />
      </View>
    </View>
  );
};

export default ChatInput;
