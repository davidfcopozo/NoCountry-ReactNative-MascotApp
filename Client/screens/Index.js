import { Text, View, ScrollView } from "react-native";
import Cards from "../components/Cards";
import Shortcuts from "../components/Shortcuts";
import CardsData from "../db/cards.json";
import Blogs from "../components/Blogs";
import BlogsData from "../db/blogs.json";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import OnboardingScreen from "./OnboardingScreen";

const Index = () => {
  const { colors } = useTheme();

  const [firstAppLaunch, setFirstAppLaunch] = useState("");
  const [finishedOnboarding, setFinishedOnboarding] = useState(false);
  const { isLogin } = useSelector(state => state.users);

  useEffect(() => {
    const getAsyncProps = async () => {
      const appData = await AsyncStorage.getItem("firstAppLaunch");
      if (appData === null) {
        setFirstAppLaunch(true);
        AsyncStorage.setItem("firstAppLaunch", "false");
      } else {
        setFirstAppLaunch(false);
      }
    };
    getAsyncProps();
  }, [AsyncStorage]);

  if (firstAppLaunch && isLogin && finishedOnboarding === false)
    return <OnboardingScreen setFinishedOnboarding={setFinishedOnboarding} />;

  return (
    <ScrollView>
      <View className="text-left w-full p-3 px-6 gap-y-2">
        <Shortcuts navigate={false} />

        <Text style={{ color: colors.text }} className="font-bold text-2xl mb-2">
          Mascoteros cerca de ti
        </Text>

        <Cards Data={CardsData} />

        <Text style={{ color: colors.text }} className="font-bold text-2xl mb-2">
          Blogs
        </Text>
        <Blogs Data={BlogsData}></Blogs>
      </View>
    </ScrollView>
  );
};

export default Index;
