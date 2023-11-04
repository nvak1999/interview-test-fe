import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import postReducer from "../features/post/postSlice";
const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
