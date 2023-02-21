import { Text, View, ScrollView, Pressable, KeyboardAvoidingView } from "react-native";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import { useRef, useState, useEffect } from "react";
import ChatMessages from "../components/ChatMessages";
import { useSelector } from "react-redux";
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
  updateDoc
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { firebaseDb } from "../firebase";

const Message = ({ route }) => {
  const user = route.params.user;
  const [reply, setReply] = useState("");
  const [isLeft, setIsLeft] = useState();
  const [recipient, setRecipient] = useState("");
  const [img, setImg] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollView = useRef();
  const currentUser = useSelector(state => state.users.currentUser.data);
  let user1 = currentUser.authId;

  /*   useEffect(() => {
    console.log("Signed in user=>", currentUser);
    console.log("Other user=>", user);
  }, []); */

  const createConversation = async () => {
    setRecipient(user);

    const user2 = user.id;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    //Reference to the conversation id with the selected user
    const msgsRef = collection(firebaseDb, "conversations", id, "chat");
    //Query to get the messages of the conversation
    const q = query(msgsRef, orderBy("createdAt", "asc"));
    onSnapshot(q, querySnapshot => {
      let msgs = [];
      querySnapshot.forEach(doc => {
        msgs.push(doc.data());
      });
      setMessages(msgs);
    });
    console.log(messages);

    const docSnap = await getDoc(doc(firebaseDb, "lastMsg", id));
    if (docSnap.data() && docSnap.data().from !== user1) {
      await updateDoc(doc(firebaseDb, "lastMsg", id), { unread: false });
    }
  };

  useEffect(() => {
    createConversation();
  }, []);

  const handleSubmit = async () => {
    const user2 = recipient.id;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(storage, `images/${new Date().getTime()} - ${img.name}`);
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(firebaseDb, "conversations", id, "chat"), {
      message,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || ""
    });

    await setDoc(doc(firebaseDb, "lastMsg", id), {
      message,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true
    });

    setMessage("");
    setImg("");
  };

  return (
    <>
      <KeyboardAvoidingView
        className="pb-4 h-full justify-center"
        behavior="padding"
        style={{ flex: 1 }}
      >
        <ChatHeader username={user.name} picture={user.user_picture} />
        <ScrollView
          className="h-full flex-1"
          ref={scrollView}
          onLayout={() => {
            scrollView.current.scrollToEnd({ animated: true });
          }}
          onContentSizeChange={() => {
            scrollView.current.scrollToEnd({ animated: true });
          }}
        >
          <ChatMessages />
        </ScrollView>

        {/* <View className="flex-row w-[90%] h-full"> */}
        <ChatInput
          username={user.name}
          reply={reply}
          isReceived={isLeft}
          message={message}
          setMessage={setMessage}
          handleSubmit={handleSubmit}
          setImg={setImg}
        />
        {/*  <Pressable className="bg-violet-700 w-[20%] rounded-br-full rounded-tr-full ">
              <Text className="m-auto text-white font-bold border border-gray-500/30">Enviar</Text>
            </Pressable> */}
        {/*  </View> */}
      </KeyboardAvoidingView>
    </>
  );
};

export default Message;
