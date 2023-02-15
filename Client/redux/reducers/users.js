import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers, sortUsersByRating, fetchUserById, searchView } from "../actions";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";

const initialState = {
  users: [],
  userDetail: {},
  favouriteUsers: [],
  search: []
};

export const registerUser = createAsyncThunk("users/registerUser", async formData => {
  try {
    const { name, surname, email, password, city } = formData;
    await createUserWithEmailAndPassword(auth, email, password);

    const userData = {
      name,
      surname,
      city,
      email,
      uid: auth.currentUser.uid
    };
    const response = await axios.post("/users/add", userData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

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
  }
});

export const { addFavouriteUser, removeFavouriteUser } = usersReducer.actions;
export default usersReducer.reducer;
