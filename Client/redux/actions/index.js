import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut
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
    return [userById.data];
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
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const loginUser = createAsyncThunk("users/loginUser", async loginCredentials => {
  try {
    const { email, password } = loginCredentials;
    await signInWithEmailAndPassword(auth, email, password);
    const firebaseId = auth.currentUser.uid;
    const currentUserData = await axios.post(`/users/login`, {
      id: firebaseId,
      email,
      password
    });

    const currentUser = {
      data: currentUserData.data.user
    };

    return currentUser;
  } catch (error) {
    console.log(error);
  }
});

export const logOutUser = createAsyncThunk(async loginCredentials => {
  try {
    const { email, password } = loginCredentials;
    await signOut(auth, email, password);
  } catch (error) {
    console.log(error);
  }
});

export const AddFavorite = createAsyncThunk("users/AddFavorite", async data => {
  try {
    const { id, fav_id } = data;

    const save = await axios.post(`/users/favorites/${id}/${fav_id}`);
    console.log("Favorito: " + save);
    return save;
  } catch (error) {
    console.log(error);
  }
});

export const DelFavorite = createAsyncThunk("users/DelFavorite", async data => {
  try {
    const { id, fav_id } = data;

    const deleteUser = await axios.delete(`/users/favorites/${id}/${fav_id}`);
    console.log("Favorito: " + deleteUser);
    return deleteUser;
  } catch (error) {
    console.log(error);
  }
});

export const fetchFavorites = createAsyncThunk("/users/fetchFavorites", async id => {
  try {
    const users = await axios.get(`/users/favorites/${id}/1`);
    return users.data;
  } catch (error) {
    console.log(error);
  }
});
