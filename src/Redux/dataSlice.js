import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postData: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    postDataHandler(state, action) {
      state.postData = action.payload;
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
