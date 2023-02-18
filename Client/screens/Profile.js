import { Text, View, Modal, ScrollView, Pressable } from "react-native";
import VisitorOptions from "../components/VisitorOptions";
import UserProfile from "../components/UserProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const { isLogin } = useSelector(state => state.users);

  return <ScrollView>{isLogin ? <UserProfile /> : <VisitorOptions />}</ScrollView>;
};

export default Profile;
