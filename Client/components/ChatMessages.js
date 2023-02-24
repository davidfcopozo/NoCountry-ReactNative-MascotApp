import { useState, useRef, Children } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";

const ChatMessages = ({ allMessages }) => {
  const currentUser = useSelector(state => state.users.currentUser.data);

  if (!allMessages) return <Text className="text-2xl mx-auto">Cargando..</Text>

  return (
    <ScrollView style={{flex: 1, paddingHorizontal: 10}}>
      {
        Children.toArray(
          allMessages.map((messages) => (
            <ChatMessage 
              sender={currentUser.id}
              messages={messages}
            />
          ))
        )
      }
    </ScrollView>
  );
};

export default ChatMessages;
