import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
    await createUserWithEmailAndPassword(auth, email, password);
    const firebaseId = auth.currentUser.uid;

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
