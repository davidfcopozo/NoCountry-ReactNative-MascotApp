import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../components/InputField";
import { useTheme, useNavigation, Link } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { BaseToast, ErrorToast } from "react-native-toast-message";

const ForgotPassword = ({ route }) => {
  const { setOpenLogin, emailFromLogin } = route.params;
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(false);
  const { loading } = useSelector(state => state.users);
  const { resetPassword } = useAuth();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  let toastConfig;

  useEffect(() => {
    setOpenLogin(false);
    setEmail(emailFromLogin ? emailFromLogin : "");
    toastConfig = {
      success: props => (
        <BaseToast
          {...props}
          style={{ borderLeftColor: "green" }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          text1Style={{
            fontSize: 17,
            fontWeight: "700"
          }}
          text2Style={{
            fontSize: 17,
            fontWeight: "700"
          }}
        />
      ),
      error: props => (
        <ErrorToast
          {...props}
          text1Style={{
            fontSize: 17
          }}
          text2Style={{
            fontSize: 17,
            fontWeight: "400"
          }}
        />
      )
    };
  }, []);

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  async function handlePasswordReset() {
    try {
      handleError("");
      await resetPassword(email);
      Toast.show({
        type: "success",
        text1: "¡Hurra!",
        text2: "Revisa tu correo para más instrucciones.",
        onHide: () => navigation.navigate("Perfil"),
        visibilityTime: 3000,
        autoHide: true
      });
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setValid(false);
        handleError("Usuario no encontrado", "email");
        Toast.show({
          type: "error",
          text1: "¡Lo sentimos!",
          text2: "No hemos encontrado este usuario."
        });
      } else if (error.code) {
        setValid(false);
        handleError("Algo salió mal, por favor intentelo de nuevo", "email");
        Toast.show({
          type: "error",
          text1: "¡Ups!",
          text2: "Algo salió mal, por favor intentelo de nuevo."
        });
      }
    }
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

    if (valid) {
      await handlePasswordReset();
    }
  };

  return (
    <>
      <View className="flex gap-y-2 p-8 w-full">
        <KeyboardAvoidingView>
          <Toast config={toastConfig} />
          {loading ? (
            <View className="absolute bottom-0  top-[-60] left-[-20] right-0 justify-center  align-center w-[100vw] bg-gray-100 opacity-25 h-[100vh] m-0 z-10">
              <ActivityIndicator
                animating={true}
                size="large"
                color="blue"
                className="self-center z-50"
              />
            </View>
          ) : null}
          <Image
            style={{
              resizeMode: "contain",
              zIndex: -1
            }}
            className="mb-4 h-28 w-56 mx-auto"
            source={require("../assets/logo.png")}
          />
          <View className="w-100 align-center">
            <Text style={{ color: colors.text }} className="text-sm mb-4 w-[80%] self-center">
              ¿Olvidó la contraseña de su cuenta? Ingrese su dirección de correo electrónico y le
              enviaremos un enlace de recuperación.
            </Text>
          </View>
          <InputField
            label="E-Mail"
            placeholder="Correo electrónico"
            onChangeText={text => setEmail(text)}
            error={errors.email}
            value={email}
          />
          <View className="bg-violet-700 p-3 rounded-lg">
            <Pressable onPress={handleValidation} disabled={loading ? true : false}>
              <Text className="text-white text-center font-bold text-lg">Continuar</Text>
            </Pressable>
          </View>
          <View className="flex gap-y-2">
            <Link to={{ screen: "Perfil" }}>
              <Text className="text-violet-500/80 font-bold">Tenes cuenta? Inicia sesión acá</Text>
            </Link>
            <Link to={{ screen: "Perfil" }}>
              <Text className="text-violet-500/80 font-bold">No tenes cuenta? Registrate acá</Text>
            </Link>
            <Text className="text-violet-500/80 font-bold">Política de Privacidad</Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default ForgotPassword;
