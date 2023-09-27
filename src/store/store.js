import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/user";
import blogSlice from "../slice/blog";
export const store = configureStore({
  reducer: {
    user: userSlice,
    blogs: blogSlice,
  },
});
