import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { useTheme } from "@react-navigation/native";

const ChatInput = ({ handleSubmit, message, setMessage }) => {

  const { dark, colors } = useTheme();

  return (
    <View className="flex-row w-full justify-center h-12 mt-6 mb-4">
      <View className="flex-row w-[95%] h-full">

        <View style={{backgroundColor: dark? colors.border : "#fff"}} className="justify-center w-[85%] lg:w-[95%] rounded-bl-2xl rounded-tl-2xl border border-gray-500/30">
          <View className="w-full h-full -auto flex-row ">
            <TextInput
              style={{color: colors.text}}
              multiline
              placeholder={"Aa..."}
              placeholderTextColor={colors.text}
              className="bg-transparent w-full h-full py-3 px-2 justify-center text-black text-sm rounded-bl-2xl rounded-tl-2xl"
              value={message}
              onChangeText={text => setMessage(text)}
            />
          </View>
        </View>

        <Pressable className="bg-violet-700 w-[16%] lg:w-[5%] flex justify-center items-center -ml-1 rounded-br-2xl rounded-tr-2xl" onPress={handleSubmit}>
          <Ionicons name="send" size={24} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
};

export default ChatInput;
