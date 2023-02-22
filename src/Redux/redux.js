import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";

const redux = configureStore({
    reducer: {
        auth: authSlice.reducer,
    }
})

export default redux;