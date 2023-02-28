import { Image, ScrollView, Text, useColorScheme, View, Linking, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";
import Developers from '../db/devs.json'
import { Children, useState } from "react";
import {Github} from '../components/Icons'

const AboutUs = () => {
  const { colors } = useTheme();
  const [showText, setShowText] = useState([
    {show: false,},
    {show: false,},
    {show: false,},
    {show: false,},
    {show: false}
  ])

  const showMore = (id) =>{
    setShowText([...showText, showText[id].show = !showText[id].show])
  }

  return (
    <ScrollView>
      <View className="px-6 pb-32">
        <Text style={{color: colors.text}} className="text-4xl font-bold my-8 mx-auto">Mascot App</Text>
        <View className="w-full my-6 ">
          <Image
            className="mx-auto"
            resizeMode="contain"
            style={{
              width: 200,
              height: 300
            }}
            source={require("../assets/about-us.png")}
          />
        </View>
        <View>
          <Text style={{color: colors.text}} className="text-2xl font-bold mb-1">Sobre la App</Text>
          <Text style={{color: colors.text}} className="text-sm font-medium text-justify">
            Mascot App fue desarrollada en React Native usando las tecnologias de NativeWind para estilar la Aplicación
            para gestionar las demas funciones se utilizo Firebase para la autenticación, como Backend se utilizo Nodejs y Express
            para gestionar los usuarios y su actividad en la Aplicación se utilizo PostgreSQL como base de datos en conjunto de Firebase
            para la integración del Chat en tiempo real.
            {"\n"}
            {"\n"}
          </Text>
        </View>

        <View className="flex justify-center items-center gap-y-2">
          <Text style={{color: colors.text}} className="font-bold text-4xl tracking-widest">Developers</Text>
            <View className="flex justify-center items-center flex-wrap flex-row gap-2">
            {
              Children.toArray(
                Developers.map(dev => (
                  <View style={{borderColor: colors.border}} className="flex flex-row border p-3 mb-1 rounded-sm max-w-lg">
                    <Image
                      className={"mr-3 ml-1 w-[100px] h-[100px] lg:w-[160px] lg:h-[160px] "+(showText[dev.id-1].show === true? "mb-auto" : "mt-auto")}
                      resizeMode="contain"
                      source={{
                          uri: dev.github_pic
                      }}
                    />
                    <View className="gap-y-1 shrink -mt-2.5 w-full">
                      <Text style={{color: colors.text}} className="font-medium text-base">{dev.name}</Text>
                      <View className="flex flex-row justify-start items-center mb-1 mr-auto">
                      {
                        Children.toArray(
                          dev.role.map(role => (
                            <Text className={"font-medium text-white p-1 "+(role === "Backend"? "bg-indigo-600" : "bg-violet-500")}>{role}</Text>
                          ))
                        )
                      }
                      </View>
                      <Text numberOfLines={showText[dev.id-1].show? 0 : 3} onPress={() => showMore(dev.id-1)} style={{color: colors.text}}>{dev.about}</Text>
                    </View>
                    <Pressable className="mt-0.5" onPress={() => Linking.openURL(dev.github_link)}>
                      <Github color={colors.text}/>
                    </Pressable>
                  </View>
                ))
              )
            }
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutUs;