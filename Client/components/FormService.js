import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const FormService = ({ openForm, setOpenForm }) => {
  const { colors } = useTheme();

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View className="flex justify-center w-full h-full">
        <View className="pt-5 px-5 h-full border-t border-black/10">
          <View className="flex flex-row items-center">
            <View>
              <Ionicons
                onPress={() => setOpenForm(!openForm)}
                name="md-close-sharp"
                size={34}
                color={colors.text}
              />
            </View>
            <View className="pl-14">
              <Text style={{ color: colors.text }} className="font-bold">
                Ofrece tus servicios
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FormService;
