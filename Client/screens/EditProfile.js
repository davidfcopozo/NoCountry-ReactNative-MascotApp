import { Text, View, Modal, ScrollView } from "react-native";
import FormEditProfile from "../components/FormEditProfile";

const EditarProfile = () => {
  return (
    <ScrollView className="h-full pb-10">
      <FormEditProfile></FormEditProfile>
    </ScrollView>
  );
};

export default EditarProfile;
