import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { customFetch } from "../utils/axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../utils/localStorage";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  //   isSidebarOpen: false,
  //   isUpdateCustomerModal: false,
  //   loginError: false,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    // return console.log(`logged in user ${JSON.stringify(user)}`);
    try {
      console.log("running");

      const resp = await customFetch.post("auth/signin", user);

      console.log(resp.data);

      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }

    //   return loginUserThunk('/auth/login', user, thunkAPI);
  }
);
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    // return console.log(`logged in user ${JSON.stringify(user)}`);
    try {
      console.log("running");

      const resp = await customFetch.post("auth/signup", user);

      console.log(resp.data);

      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }

    //   return loginUserThunk('/auth/login', user, thunkAPI);
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: initialState,

  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state) => {
      console.log("running>>>>>>>>>>>>>>>>..333");
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
    },
    setIsUpdateCustomerModal: (state) => {
      console.log("runing slice");
      state.isUpdateCustomerModal = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        // state.loading = false;
        console.log(payload);
        const { user, token } = payload;

        state.user = { user, token };
        state.isLoading = false;
        console.log(user);
        addUserToLocalStorage({ user, token });
        toast.success(`welcome back ${user.name}`);
      })
      .addCase(loginUser.pending, (state) => {
        state.loginError = false;
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.loginError = true;
        console.log(payload);
        toast.error(payload);
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        // state.loading = false;
        console.log(payload);
        const { user, token } = payload;

        state.user = { user, token };
        state.isLoading = false;
        console.log(user);
        addUserToLocalStorage({ user, token });
        toast.success(`welcome back ${user.name}`);
      })
      .addCase(registerUser.pending, (state) => {
        state.loginError = false;
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.loginError = true;
        console.log(payload);
        toast.error(payload);
      });
  },
});
// console.log
export const { toggleSidebar, logoutUser, setIsUpdateCustomerModal } =
  userSlice.actions;
console.log(logoutUser);
export default userSlice.reducer;
