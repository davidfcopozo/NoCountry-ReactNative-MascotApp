// Import the functions you need from the SDKs you need
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  FB_API_KEY,
  FB_AUTH_DOMAIN,
  FB_PROJECT_ID,
  FB_STORAGE_BUCKET,
  FB_MESSAGING_SENDER_ID,
  FB_APP_ID
} from "@env";

//yarn add firebase
//expo install @react-native-async-storage/async-storage

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Initialize Firebase

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.FB_API_KEY,
  authDomain: Constants.expoConfig.extra.FB_AUTH_DOMAIN,
  projectId: Constants.expoConfig.extra.FB_PROJECT_ID,
  storageBucket: Constants.expoConfig.extra.FB_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig.extra.FB_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig.extra.FB_APP_ID
};

//Email and password authentication instance
const app = initializeApp(firebaseConfig);
const firebaseDb = getFirestore(app);
const storage = getStorage(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export { firebaseDb, storage };
export default app;
