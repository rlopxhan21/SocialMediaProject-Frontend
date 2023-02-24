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
    updatePostDataHandler(state, action) {
      const oldData = JSON.stringify(state.postData);
      console.log(oldData);
      console.log(action.payload);
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
