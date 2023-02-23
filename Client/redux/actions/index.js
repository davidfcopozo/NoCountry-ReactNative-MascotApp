import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";

export const fetchUsers = createAsyncThunk("/users/fetchUsers", async () => {
  try {
    const users = await axios.get("/users");
    return users.data;
  } catch (error) {
    console.log(error);
  }
});

export const sortUsersByRating = createAsyncThunk("/users/sortUsersByRating", async () => {
  try {
    const users = await axios.get("/users/rating");
    return users.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchUserById = createAsyncThunk("/users/fetchUserById", async userId => {
  try {
    const userById = await axios.get(`/users/${userId}`);
    console.log(userById.data);
    return [];
  } catch (error) {
    console.log(error);
  }
});

export const searchView = createAsyncThunk("/users/search", async searchThis => {
  try {
    const users = await axios.get("/users/search", {
      params: searchThis
    });
    console.log(users.data);
    return users.data;
  } catch (error) {
    console.log(error);
  }
});

export const registerUser = createAsyncThunk("users/registerUser", async formData => {
  try {
    const { name, surname, email, password, city } = formData;
    await createUserWithEmailAndPassword(auth, email, password).then(res =>
      sendEmailVerification(res.user)
    );
    const firebaseId = auth.currentUser.uid;
    // Para saber a qué rutas se debe mandar el firebaseToken por headers, ir a Server/src/routes/users.js
    const firebaseToken = auth.currentUser.accessToken;

    const userData = {
      name,
      surname,
      city,
      fb_authId: firebaseId,
      email,
      password
    };

    const response = await axios.post("/users/register", userData);

    // showMessage(`Welcome ${userData.name} ${userData.surname}`);
    return response.data;
  } catch (error) {
    throw error.code;
  }
});

export const loginUser = createAsyncThunk("users/loginUser", async loginCredentials => {
  try {
    const { email, password } = loginCredentials;
    await signInWithEmailAndPassword(auth, email, password);
    const firebaseId = auth.currentUser.uid;
    const currentUser = await axios.get(`/users/login/${firebaseId}`);
    return currentUser;
  } catch (error) {
    // if (error.code === "auth/wrong-password") {
    //   showMessage("Contraseña incorrecta", "error");
    // } else if (error.code === "auth/user-not-found") {
    //   showMessage("No existe una cuenta registrada con ese email", "error");
    // } else {
    //   showMessage("Algo ha salido mal. Por favor inténtelo nuevamente", "error");
    // }
  }
});
