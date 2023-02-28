import { View, Text, ScrollView, TextInput, TouchableOpacity, Keyboard, Image } from "react-native";
import React from "react";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { fetchPetTypes } from "../redux/actions";

const Review = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    stars: "",
    description: ""
  });

  const [valid, setValid] = useState({
    stars: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = name => {
    if (name) {
      return val => {
        setFormData({ ...formData, [name]: val });
        setValid({ ...valid, [name]: true });
      };
    } else setValid({ ...valid, [name]: false });
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  const handleValidation = async () => {
    Keyboard.dismiss();

    if (!formData.stars) {
      handleError("Por favor, introduzca una cantidad", "stars");
      setValid({
        ...valid,
        stars: false
      });
    }

    if (valid.stars) {
      setTimeout(() => {
        alert(JSON.stringify(formData, null, 2));
      }, 100);
      navigation.goBack();
    }
  };
  return (
    <ScrollView>
      <View>
        <View className="p-5">
          <View>
            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Cantidad de estrellas
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  onChangeText={handleChange("stars")}
                />
              </View>
              {!valid.stars && <Text className="text-xs color-[#ff0000]">{errors.stars}</Text>}
            </View>

            <View className="gap-y-1 pb-3">
              <Text style={{ color: colors.text }} className="text-lg font-bold">
                Comentario (opcional)
              </Text>
              <View
                style={{ color: colors.text, borderColor: colors.text }}
                className="border rounded-lg pl-3"
              >
                <TextInput
                  style={{ color: colors.text, borderColor: colors.text }}
                  editable
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={handleChange("description")}
                />
              </View>
            </View>
          </View>
        </View>

        <View className="px-5">
          <TouchableOpacity
            className="flex justify-center items-center bg-violet-700 py-2 rounded-lg mb-6"
            onPress={handleValidation}
          >
            <Text className="text-lg text-white">Calificar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Review;
