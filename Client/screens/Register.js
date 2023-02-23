import {
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import InputField from "../components/InputField";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";
import FormSecondScreen from "../screens/FormSecondScreen";

const Register = () => {
  const { colors } = useTheme();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [screen, setScreen] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: ""
  });

  const handleValidation = async () => {
    Keyboard.dismiss();
    setValid(true);

    if (!formData.email) {
      handleError("Por favor, introduzca su correo electrónico", "email");
      setValid(false);
    }
    if (!formData.password) {
      handleError("Por favor, introduzca su contraseña", "password");
      setValid(false);
    }
    if (!formData.confirmPassword) {
      handleError("Por favor, confirme su contraseña", "confirmPassword");
      setValid(false);
    } else if (formData.password !== formData.confirmPassword) {
      handleError("Las contraseñas no coninciden, por favor inténtelo de nuevo", "confirmPassword");
      setValid(false);
    }

    if (valid) {
      setScreen(1);
    }
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
      <ScrollView>
        <View className="gap-y-2 p-8 w-full ">
          <Image
            style={{
              resizeMode: "contain"
            }}
            className="mb-4 h-28 w-56 mx-auto"
            source={require("../assets/logo.png")}
          />
          <Text style={{ color: colors.text }} className="text-2xl mb-4 font-bold text-center">
            Unite a MascotApp
          </Text>

          {screen === 0 ? (
            <View>
              <InputField
                label="Email"
                placeholder="Tu correo electrónico"
                onChangeText={text => setFormData({ ...formData, email: text })}
                error={errors.email}
                value={formData.email}
              />
              <InputField
                label="Contraseña"
                placeholder="Tu contraseña"
                /*  onChangeText={text => setPassword(text)} */
                onChangeText={text => setFormData({ ...formData, password: text })}
                error={errors.password}
                password
                value={formData.password}
              />
              <InputField
                label="Confirma tu contraseña"
                placeholder="Repite tu contraseña"
                onChangeText={text => setFormData({ ...formData, confirmPassword: text })}
                error={errors.confirmPassword}
                password
                value={formData.confirmPassword}
              />
              <View className=" bg-violet-700 rounded-lg">
                <Pressable onPress={handleValidation} className=" p-3 rounded-lg">
                  <Text className="text-white text-center font-bold text-lg">Continuar</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <FormSecondScreen formData={formData} setFormData={setFormData} setScreen={setScreen} />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
