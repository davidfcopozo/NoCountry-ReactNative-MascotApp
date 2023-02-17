import React, { useState, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  sendEmailVerification
} from "firebase/auth";
import { auth } from "../firebase";

//Create context
const AuthContext = React.createContext();

//Function to use the context
export function useAuth() {
  return useContext(AuthContext);
}

//Context provider
function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function googleSingIn() {
    const googleProvider = new GoogleAuthProvider();
    //Function with firebase method to sign in with Google
    return signInWithPopup(auth, googleProvider);
  }

  //Function with firebase method to create a user with username and password
  async function signup(email, password, name, lastname) {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then(await sendEmailVerification(auth.currentUser))
      .catch(err => console.log(err));
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function emailUpdate(email) {
    return updateEmail(currentUser, email);
  }

  function passwordUpdate(email) {
    return updatePassword(currentUser, email);
  }

  //Run this code only when the component mounts
  useEffect(() => {
    //Method to store current user in the state variable and unsubscribe it when unmounted
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });
    //Cleanup to unsubscribe
    return unsubscribe;
  }, []);

  useEffect(() => {
    setCurrentUser(auth.currentUser);
  }, [signup]);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser, signup]);

  //Context value to provide
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    emailUpdate,
    passwordUpdate,
    googleSingIn
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
