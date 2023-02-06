import { useState } from 'react';
import { Text, View, Modal, ScrollView, Pressable} from 'react-native';
import { Login, Register } from '../components/clientAuth';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind'

const Profile = () => {

  const {colorScheme} = useColorScheme()
  const [openLogin, setOpenLogin] = useState(false)
  const [openRegister, setOpenRegister] = useState(false)

  return (
    <ScrollView>
      <Text>Perfil</Text>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={openLogin}
        onRequestClose={() => {
          setOpenLogin(!openLogin)
        }}>
        <View className="flex justify-center w-full pt-12">
          <View className="bg-white pt-5 px-5 h-full border-t border-black/10 dark:bg-black">
            <View className="flex justify-between flex-row items-center">
              <Ionicons onPress={() => setOpenLogin(!openLogin)} name="md-close-sharp" size={34} color={colorScheme === 'dark'? "#fff" : "#000"} />
              <Text className="font-bold">Iniciar Sesión</Text>
              <Text className="w-10"></Text>
            </View>
            <Login/>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={openRegister}
        onRequestClose={() => {
          setOpenRegister(!openRegister)
        }}>
        <View className="flex justify-center w-full pt-12">
          <View className="bg-white pt-5 px-5 h-full border-t border-black/10 dark:bg-black">
            <View className="flex justify-between flex-row items-center">
              <Ionicons onPress={() => setOpenRegister(!openRegister)} name="md-close-sharp" size={34} color={colorScheme === 'dark'? "#fff" : "#000"} />
              <Text className="font-bold">Registrarme</Text>
              <Text className="w-10"></Text>
            </View>
            <Register/>
          </View>
        </View>
      </Modal>

      <View className="flex gap-y-2">
        <Pressable
          className="border-[1px] p-4 w-32 mx-auto rounded-sm dark:border-white"
          onPress={() => setOpenLogin(true)}>
          <Text className="font-bold text-center dark:text-white">Iniciar Sesión</Text>
        </Pressable>

        <Pressable
          className="bg-violet-700 p-4 w-32 mx-auto rounded-sm"
          onPress={() => setOpenRegister(true)}>
          <Text className="text-white font-bold text-center">Registrarme</Text>
        </Pressable>
      </View>

    </ScrollView>
  )
}

export default Profile
