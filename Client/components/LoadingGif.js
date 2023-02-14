import { Image } from "react-native";

const LoadingGif = () => {
  return <Image source={require("../assets/loading.gif")} alt="loading-gif" />;
};

export default LoadingGif;
