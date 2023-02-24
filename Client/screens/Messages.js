import { Text, View, ScrollView, Image, Pressable } from "react-native";
import { Children, useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, useTheme } from "@react-navigation/native";
import {
  collection,
  query,
  where,
  onSnapshot,
  listDocuments,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  get,
  getDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  getFirestore,
  collectionGroup,
  listCollections
} from "firebase/firestore";
import { firebaseDb as db } from "../firebase";
import { useSelector } from "react-redux";

const Messages = () => {
  const { dark, colors } = useTheme();
  const { currentUser, search } = useSelector(state => state.users);
  const user = currentUser?.data;
  const userID = user? (user?.id).toString() : undefined;
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    if (userID) {
      const unsub = onSnapshot(
        query(
        collectionGroup(
          db,
          "messages",
        ),
        where('messageUserId', "in" ,[userID]),
        ),
        (snapshot) => {
          let list = snapshot.docs.map((doc) => doc.data())
          list = list.map(e => e.messageReceiverId)
  
          list = search.filter(item => list.includes(item.id.toString()));
  
          setChatList(list);
        }
      ); 

      return unsub;
    }
  } , []);

  function deleteChat(){
    console.log("deleted");
  }

  if (chatList.length < 1)
    return (
      <View className="justify-center mx-auto flex-1">
        <Text style={{ color: colors.text }}  className="text-3xl font-bold align-center justify-center">
          No tienes conversaciones
        </Text>
      </View>
    );

  return (
    <ScrollView className="p-5 gap-y-5">
      <Text style={{ color: colors.text }} className="text-3xl font-bold">
        Mensajes
      </Text>

      {Children.toArray(
        chatList?.map(user => (
          <View className="flex flex-row justify-between">
            <Link to={{ screen: "Message", params: { user: user } }}>
            <View className="flex flex-row items-center gap-x-5">
              {user?.profile_pic ? (
                <Image
                  style={{
                    width: 85,
                    height: 85,
                    resizeMode: "contain"
                  }}
                  source={{
                    uri: user?.profile_pic
                  }}
                  className="rounded-full"
                />
              ) : (
                <Ionicons name="person-circle-outline" size={82} color={colors.text} />
              )}

              <View className="gap-y-2 items-start">
                <Text style={{ color: colors.text }} className="font-bold text-xl">
                  {user?.name+" "+user?.surname}
                </Text>
                <Text style={{ color: colors.textGray }}>Ultimo Mensaje</Text>
              </View>
            </View>
            </Link>
            <Ionicons
              name="trash-outline"
              size={26}
              color={dark? "#fff" : "#000"}
            />
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default Messages;
