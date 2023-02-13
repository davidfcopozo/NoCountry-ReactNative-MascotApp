import { useTheme } from "@react-navigation/native";
import React, { useState, useRef } from "react";
import { ScrollView } from "react-native";
import ChatMessage from "./ChatMessage";
import Messages from "../db/messages.json";

const ChatMessages = () => {
  const { colors } = useTheme();
  const [messages, setMessages] = useState(Messages);

  const user = useRef(1);

  return (
    <ScrollView style={{ backgroundColor: colors.background, flex: 1 }}>
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          time={message.time}
          isReceived={message.user !== user.current}
          message={message.content}
        />
      ))}
    </ScrollView>
  );
};

export default ChatMessages;
