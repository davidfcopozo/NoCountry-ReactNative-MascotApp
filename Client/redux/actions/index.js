// Esto solo es a modo de template para darnos una idea de la estructura

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const users = await axios.get("/users");
    console.log(users);
    return [];
  } catch (error) {
    console.log(error);
  }
});

export const fetchUserById = createAsyncThunk("users/fetchUserById", async userId => {
  try {
    const userById = await axios.get(`/users/${userId}`);
    console.log(userById);
    return [];
  } catch (error) {
    console.log(error);
  }
});
