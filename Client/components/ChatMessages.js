import { useTheme } from "@react-navigation/native";
import React, { useState, useRef } from "react";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
//import Messages from "../db/messages.json";

const ChatMessages = ({ messages }) => {
  const { colors } = useTheme();
  const [texts, setTexts] = useState(messages);
  const currentUser = useSelector(state => state.users.currentUser.data);

  const user = useRef(1);

  return (
    <ScrollView style={{ backgroundColor: colors.background, flex: 1 }}>
      {texts?.map((text, index) => (
        <ChatMessage
          key={index}
          time={text.createdAt}
          isReceived={text.from !== currentUser?.id}
          message={text.message}
        />
      ))}
    </ScrollView>
  );
};

export default ChatMessages;
