import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAll, getFollowing, getRequest } from "../api/activity";

export const getAllActivity = createAsyncThunk("activity/getAllActivity", async () => {
  const res = await getAll();
  return res.data;
});

export const getActivityFollowers = createAsyncThunk("activity/getActivityFollowers", async () => {
  const res = await getFollowing();
  return res.data;
});

export const getRequestActivity = createAsyncThunk("activity/getRequest", async () => {
  const res = await getRequest();
  return res.data;
});

const activitySlice = createSlice({
  name: "activity",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllActivity.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(getActivityFollowers.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(getRequestActivity.fulfilled, (state, action) => {
        return [...action.payload];
      });
  },
});

export default activitySlice.reducer;