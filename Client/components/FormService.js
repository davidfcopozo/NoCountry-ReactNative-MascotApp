import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Shortcuts from "./Shortcuts";

const FormService = ({ openForm, setOpenForm }) => {
  const { colors } = useTheme();

  return (
    // <ScrollView style={{ backgroundColor: colors.background }}>
    //   <View className="flex flex-row items-center py-4 px-5 gap-x-14">
    //     <View className="flex">
    //       <Ionicons
    //         onPress={() => setOpenForm(!openForm)}
    //         name="md-close-sharp"
    //         size={34}
    //         color={colors.text}
    //       />
    //     </View>
    //     <View className="flex">
    //       <Text style={{ color: colors.text }} className="font-bold">
    //         Ofrece tus servicios
    //       </Text>
    //     </View>
    //   </View>
    // </ScrollView>
    <ScrollView>
      <Shortcuts navigate={true}></Shortcuts>
    </ScrollView>
  );
};

export default FormService;
