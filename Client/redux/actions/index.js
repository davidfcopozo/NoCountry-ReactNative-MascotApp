import { createAsyncThunk } from "@reduxjs/toolkit";
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
    const users = await axios.get(`/users/search/${searchThis? searchThis : null}`);
    console.log(users.data);
    return users.data;
  } catch (error) {
    console.log(error);
  }
});

