import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import Shortcuts from "./Shortcuts";

const FormService = () => {
  const { colors } = useTheme();

  return (
    <ScrollView>
      <Shortcuts navigate={true}></Shortcuts>
    </ScrollView>
  );
};

export default FormService;
