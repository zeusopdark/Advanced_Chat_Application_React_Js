import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth.js";
import api from "./api/api.js";
import miscSlice from "./reducers/misc.js";
import chatSlice from "./reducers/chat.js";
const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [api.reducerPath]: api.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [chatSlice.name]:chatSlice.reducer
  },
  middleware: (defaultMiddleWare) => [...defaultMiddleWare(), api.middleware], //as we are using rtk query for some api than we have to add this middleware as well
});

export default store;
