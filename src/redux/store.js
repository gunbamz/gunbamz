import { configureStore } from "@reduxjs/toolkit";
//import logger from "redux-logger";
//import cartReducer from "./cartRedux";
import { apiSlice } from "./apiSlice";
import userReducer from "../features/users/userSlice";
import authReducer from "../features/auth/authSlice";
import messageReducer from "../features/messages/messageSlice";
import modeReducer from "./modeRedux";

//const rootReducer = combineReducers({ user: userReducer, mode: modeReducer, message: messageReducer });

export const store = configureStore({
  reducer: { 
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    user: userReducer,
    mode: modeReducer,
    message: messageReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});
