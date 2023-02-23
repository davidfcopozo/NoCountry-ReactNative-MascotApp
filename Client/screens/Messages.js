import { Text, View, ScrollView, Image } from "react-native";
import { Children, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CardsData from "../db/cards.json";
import { Link, useTheme } from "@react-navigation/native";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  getFirestore,
  collectionGroup
} from "firebase/firestore";
import { firebaseDb } from "../firebase";

import { useSelector } from "react-redux";

const Messages = () => {
  const { colors } = useTheme();
  const currentUser = useSelector(state => state.users.currentUser.data);
  let user1 = currentUser.authId;
  const [chats, setChats] = useState([]);
  const [recipients, setRecipients] = useState([]);

  const getChats = async () => {
    const chatsRef = collection(firebaseDb, "users", user1, "chats");
    const q = query(chatsRef);

    onSnapshot(q, querySnapshot => {
      let chts = [],
        recpts = [];
      querySnapshot.forEach(doc => {
        console.log(doc.data());
        chts.push(doc.data().chatroomId);
        recpts.push(doc.data().recipient);
      });
      setChats(chts);
      setRecipients(recpts);
      console.log(chts);
      console.log(recpts);
    });

    /* ******************************** */
    /*     onSnapshot(q, querySnapshot => {
      let users = [];
      //console.log(querySnapshot);
      querySnapshot.forEach(doc => {
        //  console.log("FROM DOCS", doc);
        //console.log(doc.data());
        users.push(doc.data());
      });
    }); */
  };

  useEffect(() => {
    getChats();
    /*     const msgsRef = collection(firebaseDb, "conversations");
    //Query to get the messages of the conversation
    //where("chat", "in", ["to", "from"]),
    const q = query(msgsRef);
    onSnapshot(q, querySnapshot => {
      let chts = [];
      querySnapshot.forEach(doc => {
        console.log("FROM DOCS", doc);
        console.log(doc.data());
        msgs.push(doc.data());
      });
      setChats(chts);
    }); */
  }, []);

  if (!CardsData)
    return (
      <View style={{ color: colors.text }} className="justify-center mx-auto flex-1">
        <Text className="text-3xl font-bold align-center justify-center">
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
        CardsData.map(user => (
          <Link to={{ screen: "Message", params: { user: user, title: user.name } }}>
            <View className="flex flex-row items-center gap-x-5">
              {user.profile_pic ? (
                <Image
                  style={{
                    width: 85,
                    height: 85,
                    resizeMode: "contain"
                  }}
                  source={{
                    uri: user.profile_pic
                  }}
                  className="rounded-full"
                />
              ) : (
                <Ionicons name="person-circle-outline" size={82} color={colors.text} />
              )}

              <View className="gap-y-2 items-start">
                <Text style={{ color: colors.text }} className="font-bold text-xl">
                  {user.name}
                </Text>
                <Text style={{ color: colors.textGray }}>Ultimo Mensaje</Text>
              </View>
            </View>
          </Link>
        ))
      )}
    </ScrollView>
  );
};

export default Messages;
