import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import usersReducer from "../reducers/users";

import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

let persistConfig = {
  key: "root",
  storage
};

let rootReducer = combineReducers({
  users: usersReducer
});

let persisteReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persisteReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
