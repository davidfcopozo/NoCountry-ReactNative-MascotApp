import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";

const ChatMessage = ({ sender, messages }) => {

  const { dark } = useTheme();

  function formatDate(dateString){
    let date = new Date(dateString * 1000).toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', hour12: false})
    return date
  }

  return messages ? (
  <View className={"py-2 px-2.5 rounded-md my-0.5 relative "+(sender !== +messages.messages.messageUserId? dark? "bg-gray-700 mr-auto" : "bg-gray-200 mr-auto" : "bg-indigo-500 ml-auto")}>
    <Text style={{color: (sender !== +messages.messages.messageUserId? dark? "#fff" : "#29232e" : "#fff" )}} className="text-md font-medium" key={messages.id}>{messages.messages.message}</Text>
    <Text style={{color: (sender !== +messages.messages.messageUserId? dark? "#fff" : "#29232e" : "#fff" )}} className="text-[9px] mt-1 ml-auto">{formatDate(messages.messages.timestamp.seconds)}</Text>
  </View>
  ) : null;
};

export default ChatMessage;
