import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firebaseDb as db } from "../../firebase";
import { auth } from "../../firebase";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const users = await axios.get("/users");
    return users.data;
  } catch (error) {
    console.log(error);
  }
});

export const sortUsersByRating = createAsyncThunk("users/sortUsersByRating", async () => {
  try {
    const users = await axios.get("/users/rating");
    return users.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchUserById = createAsyncThunk("users/fetchUserById", async userId => {
  try {
    const userById = await axios.get(`/users/${userId}`);
    console.log(userById.data);
    return [userById.data];
  } catch (error) {
    console.log(error);
  }
});

export const searchView = createAsyncThunk("users/search", async searchThis => {
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

    const userData = {
      name,
      surname,
      city,
      fb_authId: firebaseId,
      email,
      password
    };

    const response = await axios.post("users/register", userData);

    //Registra el usuario en la coleccion de users en firestore

    if (auth.currentUser.uid) {
      const userid = response.data.user.id.toString();

      setDoc(doc(db, "users", userid), {
        username: name + " " + surname,
        email: email,
        userId: userid,
        timestamp: new Date()
      });
    }

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
    // Para saber a qué rutas se debe mandar el firebaseToken por headers, ir a Server/src/routes/users.js
    const firebaseToken = auth.currentUser.accessToken;

    const currentUserData = await axios.post(`/users/login`, {
      id: firebaseId,
      email,
      password
    });

    const currentUser = {
      data: currentUserData.data.user,
      token: firebaseToken
    };

    return currentUser;
  } catch (error) {
    throw error.code;
  }
});

export const logOutUser = createAsyncThunk("users/logOutUser", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
});

export const addFavourite = createAsyncThunk("users/addFavorite", async data => {
  try {
    const { currentUser, id } = data;
    const save = await axios.post(`/users/favourites/${currentUser.data.id}/${id}`, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    });
    return save;
  } catch (error) {
    console.log(error);
  }
});

export const deleteFavourite = createAsyncThunk("users/deleteFavourite", async data => {
  try {
    const { currentUser, id } = data;
    const deleteUser = await axios.delete(`/users/favourites/${currentUser.data.id}/${id}`, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    });
    return deleteUser;
  } catch (error) {
    console.log(error);
  }
});

export const fetchFavourites = createAsyncThunk("users/fetchFavourites", async currentUser => {
  try {
    const users = await axios.get(`/users/favourites/${currentUser.data.id}`, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    });
    return users.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchPetTypes = createAsyncThunk("petTypes", async () => {
  try {
    const petTypes = await axios.get("/petTypes");
    return petTypes.data;
  } catch (error) {
    console.log(error);
  }
});

export const addNewPet = createAsyncThunk("/add", async data => {
  try {
    const { user, formData } = data;

    const newPet = {
      userId: user.id,
      petTypeId: formData.idPet,
      name: formData.name,
      age: formData.age,
      breed: formData.breed,
      weight: formData.weight
    };

    const response = await axios.post("/pets/add", newPet);
    return response.data;
  } catch (error) {
    console.log("ERROR", error);
  }
});

export const fetchNearbyUsers = createAsyncThunk("users/fetchNearbyUsers", async city => {
  try {
    const usersSameCity = await axios.get(`/users/city/${city}`);
    return usersSameCity;
  } catch (error) {
    return error.response.data;
  }
});
