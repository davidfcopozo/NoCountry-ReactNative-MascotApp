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

const Message = ({ route }) => {
    const user = route.params.user;

    return (
        <>
            <KeyboardAvoidingView
                behavior="padding"
            >
                <View className="pb-14 h-full">
                    <Text className="dark:text-white">Mensaje de {user.name}</Text>
                    
                    <ScrollView className="flex-1">
                    </ScrollView>

                    <View
                        className="flex-row w-full mb-9 h-14 border-[1px] border-black/30 dark:border-white"
                    >
                        <TextInput className="flex-1"></TextInput>
                        <Pressable className="p-2 bg-purple-600">
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
