import { View, Modal, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";

const Profile = () => {
  const { colors } = useTheme();

  const [openEdit, setOpenEdit] = useState(false);

  return (
    <View className="flex flex-row justify-center items-center p-7 pr-14">
      <Text>Holaaa</Text>
      <Modal animationType="slide" transparent={false} visible={openEdit}></Modal>
    </View>
  );
};

export default Profile;
