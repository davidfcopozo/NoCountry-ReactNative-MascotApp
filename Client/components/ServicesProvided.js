import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";

const ServicesProvided = () => {
  const colorScheme = "light";
  const { colors } = useTheme();
  const { currentUser } = useSelector(state => state.users);
  const user = currentUser?.data;
  return (
    <View style={{ color: colors.text, borderColor: colors.text }}>
      {user.offers_services ? (
        <Text className="text-base" style={{ color: colors.text, borderColor: colors.text }}>
          SI ofreces servicios
        </Text>
      ) : (
        <Text className="text-base" style={{ color: colors.text, borderColor: colors.text }}>
          No ofreces servicios
        </Text>
      )}
    </View>
  );
};

export default ServicesProvided;
