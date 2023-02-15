import {
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import InputField from "../components/InputField";
import { useState } from "react";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/reducers/users";

const FormSecondScreen = ({ formData, setFormData, setScreen }) => {
  const { colors } = useTheme();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const { signup } = useAuth();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  async function handleSignup() {
    try {
      setErrors("");
      setLoading(true);
      dispatch(registerUser(formData));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const handleValidation = async () => {
    Keyboard.dismiss();
    setValid(true);

    if (!formData.name) {
      handleError("Por favor, introduzca su nombre", "name");
      setValid(false);
    }

    if (!formData.surname) {
      handleError("Por favor, introduzca sus apellidos", "surname");
      setValid(false);
    }
    if (!formData.city) {
      handleError("Por favor, introduzca sus apellidos", "surname");
      setValid(false);
    }

    if (valid) {
      await handleSignup();
    }
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
      <ScrollView className="w-full ">
        <View className="w-full ">
          <InputField
            label="Nombres"
            placeholder="Tus nombres"
            onChangeText={text => setFormData({ ...formData, name: text })}
            error={errors.name}
            value={formData.name}
          />
          <InputField
            label="Apellidos"
            placeholder="Tus apellidos"
            onChangeText={text => setFormData({ ...formData, surname: text })}
            /* onChangeText={text => setSurname(text)} */
            error={errors.surname}
            value={formData.surname}
          />
          <InputField
            label="Ciudad"
            placeholder="Ciudad"
            onChangeText={text => setFormData({ ...formData, city: text })}
            /* onChangeText={text => setCity(text)} */
            error={errors.city}
            value={formData.city}
          />

          <View className=" gap-2 flex-row justify-center w-full">
            <View className="rounded-lg bg-violet-700 m-2 flex-[0.5]">
              <Pressable onPress={() => setScreen(0)} className=" p-3 rounded-lg">
                <Text className="text-white text-center font-bold text-lg">Atras</Text>
              </Pressable>
            </View>
            <View className="rounded-lg bg-violet-700 m-2 flex-[0.5]">
              <Pressable onPress={handleValidation} className=" p-3 rounded-lg">
                <Text className="text-white text-center font-bold text-lg">Registrarme</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FormSecondScreen;
