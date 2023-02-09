import {
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView
} from "react-native";
import { Link, useTheme } from "@react-navigation/native";


const Message = ({ route }) => {
    const user = route.params.user;
    const { colors } = useTheme();

    return (
        <>
            <KeyboardAvoidingView
                behavior="padding"
            >
                <View className="pb-14 h-full">
                    <Text style={{color: colors.text}}>Mensaje de {user.name}</Text>
                    
                    <ScrollView className="flex-1">
                    </ScrollView>

                    <View
                        className="flex-row w-full mb-9 h-14 border border-gray-500/30"
                    >
                        <TextInput className="flex-1"></TextInput>
                        <Pressable className="p-2 bg-indigo-600">
                            <Text className="m-auto text-white font-bold">
                                Enviar
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    );
};

export default Message;
