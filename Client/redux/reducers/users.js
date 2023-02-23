import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsers,
  sortUsersByRating,
  fetchUserById,
  searchView,
  registerUser,
  loginUser,
  logOutUser
} from "../actions";

const initialState = {
  users: [],
  loading: false,
  currentUser: [],
  userDetail: {},
  favouriteUsers: [],
  search: [],
  isLogin: false
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
    },
    actionLogin: (state, action) => {
      state.isLogin = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(sortUsersByRating.fulfilled, (state, action) => {
      state.search = action.payload;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.userDetail = action.payload;
    });
    builder.addCase(searchView.fulfilled, (state, action) => {
      state.search = action.payload;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(loginUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, state => {
      state.loading = false;
    });
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.currentUser = [];
      state.isLogin = false;
    });
  }
});

export const { addFavouriteUser, removeFavouriteUser, actionLogin } = usersReducer.actions;
export default usersReducer.reducer;
