import { View, Text, Image } from "react-native";

const LoadingGif = () => {
  return (
    <View className="mx-auto rounded-2xl overflow-hidden">
      <Image style={{width: 250 , height: 200}} source={require("../assets/loading.gif")} alt="loading-gif" />
      <Text className="mx-auto w-full py-2 pb-2.5 text-center font-bold text-3xl text-white bg-violet-600">Cargando...</Text>
    </View>
  )
};

export default LoadingGif;
