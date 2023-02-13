import { View, Text } from "react-native";

const ChatMessage = ({ time, isReceived, message }) => {
  const isOnReceived = type => {
    if (isReceived && type === "messageContainer") {
      return {
        alignSelf: "flex-start",
        backgroundColor: "#f0f0f0",
        borderTopLeftRadius: 0,
        fontWeight: "bold"
      };
    } else if (isReceived && type === "message") {
      return {
        color: "#000",
        fontWeight: "bold"
      };
    } else if (isReceived && type === "time") {
      return {
        color: "grey"
      };
    } else {
      return {
        borderTopRightRadius: 0
      };
    }
  };
  return message ? (
    <View className="flex-1">
      <View
        className=" bg-violet-700 max-w-[90%] self-end flex-row mx-8 mt-8 rounded-lg pt-3 px-4 pb-1"
        style={isOnReceived("messageContainer")}
      >
        <View className="max-w-[80%] ">
          <Text
            className="self-start text-sm mr-4 text-white font-bold"
            style={isOnReceived("message")}
          >
            {message}
          </Text>
        </View>
        <View className=" justify-end mr-none mt-4 text-slate-400">
          <Text className="text-gray-400 text-xs" style={isOnReceived("time")}>
            {time}
          </Text>
        </View>
      </View>
    </View>
  ) : null;
};

export default ChatMessage;
