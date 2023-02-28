import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, useNavigation } from "@react-navigation/native";

const Configuration = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View className="py-2 gap-y-3">
        <Pressable
          className="flex flex-row justify-between items-center py-2 px-5"
          onPress={() => navigation.navigate({ name: "Edit" })}
        >
          <Text style={{ color: colors.text }} className="text-lg font-medium">
            Editar perfil
          </Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.text} />
        </Pressable>
        <Pressable
          className="flex flex-row justify-between items-center py-2 px-5"
          onPress={() => navigation.navigate({ name: "Favorites" })}
        >
          <Text style={{ color: colors.text }} className="text-lg font-medium">
            Mis favoritos
          </Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.text} />
        </Pressable>
        <Pressable
          className="flex flex-row justify-between items-center py-2 px-5"
          onPress={() => navigation.navigate({ name: "ForgotPassword" })}
        >
          <Text style={{ color: colors.text }} className="text-lg font-medium">
            Cambiar contraseña
          </Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.text} />
        </Pressable>
        <Pressable
          className="flex flex-row justify-between items-center py-2 px-5"
          onPress={() => navigation.navigate({ name: "AboutUs" })}
        >
          <Text style={{ color: colors.text }} className="text-lg font-medium">
            Acerca de nosotros
          </Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.text} />
        </Pressable>
        <Pressable
          className="flex flex-row justify-between items-center py-2 px-5"
          onPress={() => navigation.navigate({ name: "Privacy" })}
        >
          <Text style={{ color: colors.text }} className="text-lg font-medium">
            Politicas de privacidad
          </Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.text} />
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Configuration;
