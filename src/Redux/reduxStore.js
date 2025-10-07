import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartSlice from "./cartSlice";

const reduxConfigStore = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartSlice,
  },
});

export default reduxConfigStore;


