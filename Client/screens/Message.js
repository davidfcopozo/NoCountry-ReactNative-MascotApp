import { Text, View, ScrollView, TextInput, Pressable, KeyboardAvoidingView } from "react-native";
import { useTheme } from "@react-navigation/native";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import { useState } from "react";
import ChatMessages from "../components/ChatMessages";

const Message = ({ route }) => {
  const user = route.params.user;
  const { colors } = useTheme();
  const [reply, setReply] = useState("");
  const [isLeft, setIsLeft] = useState();

  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={5}
        className="pb-4 pt-8 h-full justify-center"
        behavior="padding"
        style={{ flex: 1 }}
      >
        <ChatHeader username={user.name} picture={user.user_picture} />
        <ScrollView className="h-full flex-1">
          <ChatMessages />
        </ScrollView>

        <View className="flex-row w-full mb-1 justify-center h-12 mt-4">
          <View className="flex-row w-[90%] h-full">
            <ChatInput username={user.name} reply={reply} isLeft={isLeft} />
            <Pressable className="bg-violet-700 w-[20%] rounded-br-full rounded-tr-full ">
              <Text className="m-auto text-white font-bold border border-gray-500/30">Enviar</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default Message;
