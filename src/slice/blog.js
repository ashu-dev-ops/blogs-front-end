import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { customFetch } from "../utils/axios";

const initialState = {
  editorData: "",
  allBlogData: [],
  publishedBlogs: [],
  Blogsurls: [],
};

export const saveBlog = createAsyncThunk(
  "blog/save",
  async (data, thunkAPI) => {
    // return console.log(`logged in user ${JSON.stringify(user)}`);
    try {
      console.log("running");
      const resp = await customFetch.post("blogs/", data);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    } //   return loginUserThunk('/auth/login', user, thunkAPI);
  }
);
export const getAllBlog = createAsyncThunk(
  "blog/getAll",
  async (data, thunkAPI) => {
    // return console.log(`logged in user ${JSON.stringify(user)}`);
    try {
      console.log("running");
      const resp = await customFetch.get("blogs/");
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    } //   return loginUserThunk('/auth/login', user, thunkAPI);
  }
);
export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async (data, thunkAPI) => {
    // return console.log(`logged in user ${JSON.stringify(user)}`);
    try {
      console.log("running");
      console.log(data);
      const resp = await customFetch.patch(`blogs/${data.id}`, data);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    } //   return loginUserThunk('/auth/login', user, thunkAPI);
  }
);
export const getAllPublishedBlogs = createAsyncThunk(
  "blog/publish",
  async (data, thunkAPI) => {
    // return console.log(`logged in user ${JSON.stringify(user)}`);
    try {
      console.log("running");
      console.log(data);
      const resp = await customFetch.get(`blogs/publish`);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    } //   return loginUserThunk('/auth/login', user, thunkAPI);
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: initialState,

  reducers: {
    addUrlBlogs: (state, payload) => {
      state.Blogsurls.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveBlog.fulfilled, (state, { payload }) => {
        // state.loading = false;
        console.log(payload);
        // const { user, token } = payload;
      })
      .addCase(saveBlog.pending, (state) => {})
      .addCase(saveBlog.rejected, (state, { payload }) => {})
      .addCase(getAllBlog.fulfilled, (state, { payload }) => {
        console.log("here>>>>>....");
        console.log(payload.blogs);
        state.allBlogData = payload.blogs;
      })
      .addCase(updateBlog.pending, (state) => {
        console.log("pending");
      })
      .addCase(updateBlog.fulfilled, (state) => {
        console.log("updated successfully");
      })
      .addCase(updateBlog.rejected, (state) => {
        console.log("updated rejected");
      })
      .addCase(getAllPublishedBlogs.fulfilled, (state, data) => {
        console.log("data i want is below");
        state.publishedBlogs = data.payload;
      });
  },
});
export const { addUrlBlogs } = blogSlice.actions;
export default blogSlice.reducer;
