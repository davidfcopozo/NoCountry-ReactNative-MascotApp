import React from "react";
import { View, Text, Pressable, Image, Platform } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { BackIcon } from "./Icons";
import { Ionicons } from "@expo/vector-icons";

const ChatHeader = ({ user }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  
  return (
    <View className={"h-15 flex-row bg-white-500 dark:black-500 lg:pt-2 pb-1 mb-1 w-full align-center "+(Platform.OS === "ios"? "pt-10" : "pt-4")}>
      <Pressable
        className="justify-center px-5"
        onPress={() => navigation.goBack()}
        style={({ pressed }) => pressed && { opacity: 0.8 }}
      >
        <BackIcon color={colors.text} />
      </Pressable>
      <Pressable
        className="flex-1 flex-row align-center px-1"
        onPress={() => navigation.navigate({name: "VisitProfile", params: { user }})}
        style={({ pressed }) => pressed && { opacity: 0.8 }}
      >
        <View className="flex-4 flex-row align-center px-1">
          {user?.profile_pic !== null ? (
            <Image className="rounded-full h-14 w-14" source={{ uri: user.profile_pic }} />
          ) : (
            <Ionicons name="person-circle-outline" size={56} color={colors.text} />
          )}
          <View className="flex-column justify-center px-1">
            <Text className="font-bold text-lg ml-2" style={{ color: colors.text }}>
              {user?.name}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default ChatHeader;
