// Esto solo es a modo de template para darnos una idea de la estructura

import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, fetchUserById } from "../actions";

const initialState = {
  users: [],
  userDetail: {},
  favouriteUsers: []
};

const usersReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    addFavouriteUser: (state, action) => {
      state.favouriteUsers.push(action.payload);
    },
    removeFavouriteUser: (state, action) => {
      const newArray = state.favouriteUsers.filter(favUser => favUser.imdbID !== action.payload);
      state.favouriteUsers = newArray;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.userDetail = action.payload;
    });
  }
});

export const { addFavouriteUser, removeFavouriteUser } = usersReducer.actions;
export default usersReducer.reducer;
