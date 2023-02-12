import { useTheme } from "@react-navigation/native";
import React, { useState, useRef } from "react";
import { ScrollView } from "react-native";
import ChatMessage from "./ChatMessage";

const ChatMessages = () => {
  const { colors } = useTheme();
  const [messages, setMessages] = useState([
    {
      user: 2,
      time: "12:00",
      content: "Hola"
    },
    {
      user: 1,
      time: "12:05",
      content: "Qué hay?"
    },
    {
      user: 2,
      time: "12:07",
      content: "Cómo estas?"
    },
    {
      user: 1,
      time: "12:09",
      content: "todo bien"
    },
    {
      user: 2,
      time: "12:00",
      content: "Me alegro :)"
    },
    {
      user: 1,
      time: "12:05",
      content: "Te invito a salir"
    },
    {
      user: 2,
      time: "12:07",
      content: "Listo"
    },
    {
      user: 1,
      time: "12:09",
      content: "Dale"
    },
    {
      user: 2,
      time: "12:07",
      content: "a las 9?"
    },
    {
      user: 1,
      time: "12:09",
      content: "Me parece bien"
    },
    {
      user: 0,
      time: "12:09",
      content: "Genial"
    }
  ]);

  const user = useRef(1);
  const scrollView = useRef();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background, flex: 1 }}
      ref={ref => (scrollView.current = ref)}
      onContentChange={() => {
        scrollView.current.scrollToEnd({ animated: true });
      }}
    >
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          time={message.time}
          isLeft={message.user !== user.current}
          message={message.content}
        />
      ))}
    </ScrollView>
  );
};

export default ChatMessages;
