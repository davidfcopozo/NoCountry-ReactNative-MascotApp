import {
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import InputField from "./InputField";
import { useState } from "react";

//Componentes de Login y Register

export const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

  const handleChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  function handleSignin() {
    console.log("Si!, has iniciado sesión");
  }

  const handleValidation = () => {
    Keyboard.dismiss();
    setValid(true);

    if (!inputs.email) {
      handleError("Por favor, introduzca su correo electrónico", "email");
      setValid(false);
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Por favor, introduzca un correo válido", "email");

      setValid(false);
    }

    if (!inputs.password) {
      handleError("Por favor, introduzca su contraseña", "password");
      setValid(false);
    } else if (inputs.password.length < 5) {
      handleError("Por favor, introduzca una contraseña con al menos 5 caracteres", "password");
      setValid(false);
    }
    if (valid) {
      handleSignin();
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
      <View className="flex gap-y-2 p-8 w-full">
        <Image
          style={{
            resizeMode: "contain"
          }}
          className="mb-4 h-28 w-56 mx-auto"
          source={require("../assets/logo.png")}
        />

        <Text className="text-2xl mb-4 font-bold text-center dark:text-white">
          Bienvenido a MascotApp
        </Text>
        <InputField
          label="E-Mail"
          placeholder="Correo electrónico"
          onChangeText={text => handleChange(text, "email")}
          error={errors.email}
        />
        <InputField
          label="Contraseña"
          placeholder="Tu contraseña"
          onChangeText={text => handleChange(text, "password")}
          error={errors.password}
          password
        />

        <View className="bg-violet-700 p-3 rounded-lg">
          <Pressable onPress={handleValidation}>
            <Text className="text-white text-center font-bold text-lg">Continuar</Text>
          </Pressable>
        </View>

        <View className="flex gap-y-2">
          <Text className="text-violet-500/80 font-bold">Me Olvide la Contraseña</Text>
          <Text className="text-violet-500/80 font-bold">Politica de Privacidad</Text>
          <Text className="text-violet-500/80 font-bold">No tenes cuenta? Registrate aca</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    lastName: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

  const handleChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  function handleSignup() {
    console.log("Si!", "Te has registrado correctamente");
  }

  const handleValidation = () => {
    Keyboard.dismiss();
    setValid(true);

    if (!inputs.email) {
      handleError("Por favor, introduzca su correo electrónico", "email");
      setValid(false);
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Por favor, introduzca un correo válido", "email");

      setValid(false);
    }

    if (!inputs.name) {
      handleError("Por favor, introduzca su nombre completo", "name");
      setValid(false);
    }

    if (!inputs.lastName) {
      handleError("Por favor, introduzca sus apellidos", "lastName");
      setValid(false);
    }

    if (!inputs.password) {
      handleError("Por favor, introduzca su contraseña", "password");
      setValid(false);
    } else if (inputs.password.length < 5) {
      handleError("Por favor, introduzca una contraseña con al menos 5 caracteres", "password");
      setValid(false);
    }
    if (!inputs.confirmPassword) {
      handleError("Por favor, confirme su contraseña", "confirmPassword");
      setValid(false);
    } else if (inputs.password !== inputs.confirmPassword) {
      handleError("Las contraseñas no conincide, intentelo de nuevo", "confirmPassword");
      setValid(false);
    }

    if (valid) {
      handleSignup();
    }
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
          <Text className="text-2xl mb-4 font-bold text-center dark:text-white">
            Unite a MascotApp
          </Text>
          <InputField
            label="Nombres"
            placeholder="Tu nombres"
            onChangeText={text => handleChange(text, "name")}
            error={errors.name}
          />
          <InputField
            label="Apellidos"
            placeholder="Tus apellidos"
            onChangeText={text => handleChange(text, "lastName")}
            error={errors.lastName}
          />
          <InputField
            label="E-Mail"
            placeholder="Correo electrónico"
            onChangeText={text => handleChange(text, "email")}
            error={errors.email}
          />
          <InputField
            label="Contraseña"
            placeholder="Tu contraseña"
            onChangeText={text => handleChange(text, "password")}
            error={errors.password}
            password
          />
          <InputField
            label="Confirma tu contraseña"
            placeholder="Repite tu contraseña"
            onChangeText={text => handleChange(text, "confirmPassword")}
            error={errors.confirmPassword}
            password
          />

          <View className="bg-violet-700 p-3 rounded-lg">
            <Pressable onPress={handleValidation}>
              <Text className="text-white text-center font-bold text-lg">Continuar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
