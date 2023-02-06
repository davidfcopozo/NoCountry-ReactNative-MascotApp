import { Text, View, Image, Pressable, ScrollView } from 'react-native';
import { Children } from 'react';
import { Ionicons,FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';

const Shortcuts = () => {
  return (
    <View style={{marginLeft: "auto", marginRight: "auto"}} className="flex flex-wrap flex-row py-5 gap-3 w-full">

      <View className="w-28 gap-y-2">
        <View className="bg-pink-200 items-center p-4 rounded-xl">
        <Image
            style={{
                width: 55,
                height: 55,
                resizeMode: "contain"
            }}
            source={require('../assets/pet_haircut.png')}
        />
        </View>
        <Text className="text-center font-bold dark:text-white">Corte de Pelo</Text>
      </View>

      <View className="w-28 gap-y-2">
        <View className="bg-pink-200 items-center p-4 rounded-xl">
        <Image
            style={{
                width: 55,
                height: 55,
                resizeMode: "contain"
            }}
            source={require('../assets/pet_training.png')}
        />
        </View>
        <Text className="text-center font-bold dark:text-white">Entrenamiento</Text>
      </View>

      <View className="w-28 gap-y-2">
        <View className="bg-pink-200 items-center p-4 rounded-xl">
        <Image
            style={{
                width: 55,
                height: 55,
                resizeMode: "contain"
            }}
            source={require('../assets/pet_walk.png')}
        />
        </View>
        <Text className="text-center font-bold dark:text-white">Paseador</Text>
      </View>

      <View className="w-28 gap-y-2">
        <View className="bg-pink-200 items-center p-4 rounded-xl">
        <Image
            style={{
                width: 55,
                height: 55,
                resizeMode: "contain"
            }}
            source={require('../assets/pet_transport.png')}
        />
        </View>
        <Text className="text-center font-bold dark:text-white">Transporte</Text>
      </View>

      <View className="w-28 gap-y-2">
        <View className="bg-pink-200 items-center p-4 rounded-xl">
        <Image
            style={{
                width: 55,
                height: 55,
                resizeMode: "contain"
            }}
            source={require('../assets/pet_care.png')}
        />
        </View>
        <Text className="text-center font-bold dark:text-white">Cuidado</Text>
      </View>

    </View>
  )
}

export default Shortcuts
