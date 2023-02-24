import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import dataSlice from "./dataSlice";

const redux = configureStore({
  reducer: {
    auth: authSlice.reducer,
    data: dataSlice.reducer,
  },
});

export default redux;
