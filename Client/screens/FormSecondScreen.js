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
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./../redux/actions/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormSecondScreen = ({ formData, setFormData, setScreen }) => {
  const { colors } = useTheme();

  const firebaseError = useSelector(state => state.users.fbError);
  console.log("fb_error: ", firebaseError);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

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
      handleError("Por favor, introduzca su apellido", "surname");
      setValid(false);
    }
    if (!formData.city) {
      handleError("Por favor, introduzca su ciudad", "city");
      setValid(false);
    }

    switch (firebaseError?.message) {
      case "auth/email-already-in-use":
        toast.error("Ya existe una cuenta con ese email", {
          position: toast.POSITION.BOTTOM_CENTER
        });
        setValid(false);
        break;
      case "auth/invalid-email":
        toast.error("Email inválido", { position: toast.POSITION.BOTTOM_CENTER });
        setValid(false);
        break;
      case "auth/weak-password":
        toast.error("La contraseña es demasiado débil", { position: toast.POSITION.BOTTOM_CENTER });
        setValid(false);
        break;
      default:
        toast.error("Algo ha salido mal. Por favor, inténtelo nuevamente", {
          position: toast.POSITION.BOTTOM_CENTER
        });
        setValid(false);
        break;
    }

    if (valid) {
      await handleSignup();
      await AsyncStorage.setItem("token", formData);
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
            label="Nombre"
            placeholder="Tu nombre"
            onChangeText={text => setFormData({ ...formData, name: text })}
            error={errors.name}
            value={formData.name}
          />
          <InputField
            label="Apellido"
            placeholder="Tu apellido"
            onChangeText={text => setFormData({ ...formData, surname: text })}
            /* onChangeText={text => setSurname(text)} */
            error={errors.surname}
            value={formData.surname}
          />
          <InputField
            label="Ciudad"
            placeholder="Tu ciudad"
            onChangeText={text => setFormData({ ...formData, city: text })}
            /* onChangeText={text => setCity(text)} */
            error={errors.city}
            value={formData.city}
          />

          <View className=" gap-2 flex-row justify-center w-full">
            <View className="rounded-lg bg-violet-700 m-2 flex-[0.5]">
              <Pressable onPress={() => setScreen(0)} className=" p-3 rounded-lg">
                <Text className="text-white text-center font-bold text-lg">Atrás</Text>
              </Pressable>
            </View>
            <View className="rounded-lg bg-violet-700 m-2 flex-[0.5]">
              <Pressable onPress={handleValidation} className=" p-3 rounded-lg">
                <Text className="text-white text-center font-bold text-lg">Registrarme</Text>
              </Pressable>
            </View>
          </View>

          <ToastContainer />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FormSecondScreen;
