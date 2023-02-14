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
import { addUser } from "../redux/reducers/users";

const Register = () => {
  const { colors } = useTheme();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup } = useAuth();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  async function handleSignup() {
    try {
      setErrors("");
      setLoading(true);
      await signup(email, password, name, surname);

      await navigation.navigate("Perfil");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        handleError(
          "Este correo ya está en uso, si ya tiene una cuenta presione la optición de cambiar contraseña o utilice un correo diferente",
          "email"
        );
      } else if (error.code === "auth/invalid-email") {
        handleError("Por favor, introduzca un correo válido", "email");
      } else if (error.code === "auth/weak-password") {
        handleError("Por favor, introduzca una contraseña con al menos 5 caracteres", "password");
      } else if (error.code) {
        Alert.alert("Algo salió mal, por favor, intentalo de nuevo");
      }
    }
    setLoading(false);
  }

  const handleValidation = async () => {
    Keyboard.dismiss();
    setValid(true);

    if (!email) {
      handleError("Por favor, introduzca su correo electrónico", "email");
      setValid(false);
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      handleError("Por favor, introduzca un correo válido", "email");

      setValid(false);
    }

    if (!name) {
      handleError("Por favor, introduzca su nombre", "name");
      setValid(false);
    }

    if (!surname) {
      handleError("Por favor, introduzca sus apellidos", "surname");
      setValid(false);
    }

    if (!password) {
      handleError("Por favor, introduzca su contraseña", "password");
      setValid(false);
    } else if (password.length < 5) {
      handleError("Por favor, introduzca una contraseña con al menos 5 caracteres", "password");
      setValid(false);
    }
    if (!confirmPassword) {
      handleError("Por favor, confirme su contraseña", "confirmPassword");
      setValid(false);
    } else if (password !== confirmPassword) {
      handleError("Las contraseñas no conincide, intentelo de nuevo", "confirmPassword");
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
      <ScrollView>
        <View className="justify-center items-center mb-6"></View>
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
          <InputField
            label="Nombres"
            placeholder="Tus nombres"
            onChangeText={text => setName(text)}
            error={errors.name}
          />
          <InputField
            label="Apellidos"
            placeholder="Tus apellidos"
            onChangeText={text => setSurname(text)}
            error={errors.surname}
          />
          <InputField
            label="E-Mail"
            placeholder="Correo electrónico"
            onChangeText={text => setEmail(text)}
            error={errors.email}
          />
          <InputField
            label="Contraseña"
            placeholder="Tu contraseña"
            onChangeText={text => setPassword(text)}
            error={errors.password}
            password
          />
          <InputField
            label="Confirma tu contraseña"
            placeholder="Repite tu contraseña"
            onChangeText={text => setConfirmPassword(text)}
            error={errors.confirmPassword}
            password
          />

          <View className=" bg-violet-700 rounded-lg">
            <Pressable
              onPress={handleValidation}
              /* disabled={loading ? true : false} */
              /* style={{ backgroundColor: disabled ? "gray" : "rgb(109 40 217)" }} */
              className=" p-3 rounded-lg"
            >
              <Text className="text-white text-center font-bold text-lg">Continuar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
