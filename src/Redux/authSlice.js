import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const initialState = {
  isLoggedIn: localStorage.getItem("authToken") ? true : false,
  tokenInfo: localStorage.getItem("authToken")
    ? JSON.parse(localStorage.getItem("authToken"))
    : undefined,
  currentUserID: localStorage.getItem("authToken")
    ? jwt_decode(JSON.parse(localStorage.getItem("authToken"))?.access)?.user_id
    : undefined,
  currentUserData: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginHandler(state, action) {
      state.tokenInfo = action.payload;
      state.isLoggedIn = true;

      const user_id = jwt_decode(action.payload.access).user_id;
      state.currentUserID = user_id;

      localStorage.setItem("authToken", JSON.stringify(action.payload));
    },

    logoutHandler(state) {
      state.tokenInfo = undefined;
      state.isLoggedIn = false;
      state.currentUserID = undefined;
      state.currentUserData = undefined;

      localStorage.removeItem("authToken");
    },

    updateCurrentUserData(state, action) {
      state.currentUserData = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
