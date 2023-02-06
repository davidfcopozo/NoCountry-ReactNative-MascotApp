import { Text, View, ScrollView, Image } from 'react-native'
import { Children } from 'react'
import { Ionicons } from '@expo/vector-icons'
import CardsData from '../db/cards.json'
import { Link } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'

const Messages = () =>{

    const {colorScheme} = useColorScheme()

    return (
      <ScrollView className="p-5 gap-y-5">
        <Text className="text-3xl font-bold dark:text-white">Mensajes</Text>

        {
          Children.toArray(
          CardsData.map(user => (
            <Link to={{screen: "Message", params: {user: user, title: user.name}}}>
            <View className="flex flex-row items-center gap-x-5">
             <View className="bg-gray-200 dark:bg-gray-800">
             {
              user.user_picture?
              <Image
                  style={{
                      width: 85,
                      height: 85,
                      resizeMode: "contain"
                  }}
                  source={{
                      uri: user.user_picture,
                  }}
              />
              :
              <Ionicons name="person-circle-outline" size={82} color={colorScheme === 'dark'? "#fff" : "#000"} />
              }
              </View>

              <View className="gap-y-2 items-start">
                <Text className="font-bold text-xl dark:text-white">{user.name}</Text>
                <Text className="text-gray-700/50 dark:text-white/70">Ultimo Mensaje</Text>
              </View>
            </View>
            </Link>
          ))
          )
        }
      </ScrollView>
    )
}

export default Messages