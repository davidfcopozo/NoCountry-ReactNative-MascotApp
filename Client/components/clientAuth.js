import { Text, View, TextInput, Image, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from 'nativewind'

//Componentes de Login y Register

export const Login = () => {

    const {colorScheme} = useColorScheme()

    return (
        <View className="flex gap-y-2 p-8 w-full">
            <Image
                style={{
                    resizeMode: "contain"
                }}
                className="mb-4 h-28 w-56 mx-auto"
                source={require('../assets/logo.png')}/>

            <Text className="text-2xl mb-4 font-bold text-center dark:text-white">
                Bienvenido a MascotApp
            </Text>
            <Text className="font-bold text-black/60 dark:text-white/60">E-mail</Text>
            <TextInput
                className="border-[1px] border-black/20 p-3 rounded-sm mb-2 dark:border-white/10"
                placeholder="usuario@gmail.com"
                placeholderTextColor={colorScheme === "dark"? "#ffffff61" : "#0000003d"}
            />

            <Text className="font-bold text-black/60 dark:text-white/60">Contraseña</Text>
            <TextInput
                className="border-[1px] border-black/20 p-3 rounded-sm mb-2 dark:border-white/10"
                placeholder="contraseña"
                placeholderTextColor={colorScheme === "dark"? "#ffffff61" : "#0000003d"}
            />

            <Pressable className="bg-violet-700 p-3 rounded-sm">
                <Text className="text-white text-center font-bold text-lg">
                    Continuar
                </Text>
            </Pressable>

            <View className="flex gap-y-2">
                <Text className="text-violet-500/80 font-bold">
                    Me Olvide la Contraseña
                </Text>
                <Text className="text-violet-500/80 font-bold">
                    Politica de Privacidad
                </Text>
                <Text className="text-violet-500/80 font-bold">
                    No tenes cuenta? Registrate aca
                </Text>
            </View>
        </View>
    );
};

export const Register = () => {

    const {colorScheme} = useColorScheme()

    return (
        <View className="flex gap-y-2 p-8 w-full">
            <Image
                style={{
                    resizeMode: "contain"
                }}
                className="mb-4 h-28 w-56 mx-auto"
                source={require('../assets/logo.png')}/>

            <Text className="text-2xl mb-4 font-bold text-center dark:text-white">
                Unite a MascotApp
            </Text>
            <Text className="font-bold text-black/60 dark:text-white/60">E-mail</Text>
            <TextInput
                className="border-[1px] border-black/20 p-3 rounded-sm mb-2 dark:border-white/10"
                placeholder="usuario@gmail.com"
                placeholderTextColor={colorScheme === "dark"? "#ffffff61" : "#0000003d"}
            />

            <Text className="font-bold text-black/60 dark:text-white/60">Contraseña</Text>
            <TextInput
                className="border-[1px] border-black/20 p-3 rounded-sm mb-2 dark:border-white/10"
                placeholder="contraseña"
                placeholderTextColor={colorScheme === "dark"? "#ffffff61" : "#0000003d"}
            />

            <Pressable className="bg-violet-700 p-3 rounded-sm">
                <Text className="text-white text-center font-bold text-lg">
                    Continuar
                </Text>
            </Pressable>
        </View>
    );
};
