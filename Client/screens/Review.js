import { View, Text, ScrollView, TextInput, TouchableOpacity, Keyboard, Image } from "react-native";
import React, { Children, useRef } from "react";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { fetchPetTypes } from "../redux/actions";
import { Ionicons } from "@expo/vector-icons";

const Review = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");

  const [formData, setFormData] = useState(null);

  const [errors, setErrors] = useState(undefined);

  const handleValidation = async () => {
    Keyboard.dismiss();

    if (!stars) {
      setErrors(true)
    }

    if (stars) {

      setFormData({
        stars,
        description
      })
      
      //navigation.goBack();
    }
  };
  return (
    <ScrollView>
      <View>
        <View className="p-5 gap-y-5">
          <Text style={{ color: colors.text }} className="text-lg font-bold -mb-3">
            Cantidad de estrellas
          </Text>
          {errors? <Text>La calificación es obligatoria.</Text> : undefined}

          <View className="flex flex-row gap-x-1">
            {Children.toArray(
              Array.from(Array(5)).map((e, index) => (
                <Ionicons
                  onPress={() => {setStars(index + 1), setErrors(false)}}
                  name={stars <= index ? "star-outline" : "star"}
                  color={stars <= index ? colors.text : "#fff133"}
                  size={25}
                />
              ))
            )}
          </View>

          <Text style={{ color: colors.text }} className="text-lg font-bold -mb-3">
            Comentario (opcional)
          </Text>
          <View
            style={{ color: colors.text, borderColor: colors.text }}
            className="border rounded-lg"
          >
            <TextInput
              className="px-2"
              style={{ color: colors.text, borderColor: colors.text }}
              editable
              multiline={true}
              numberOfLines={4}
              onChangeText={setDescription}
            />
          </View>
        </View>

        <Text>{JSON.stringify(formData)}</Text>

        <View className="px-5">
          <TouchableOpacity
            className="flex justify-center items-center bg-violet-700 py-2 rounded-lg mb-6"
            onPress={handleValidation}
          >
            <Text className="text-lg text-white font-medium">Calificar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Review;
