import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  khaled: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    setKhaled: (state, action) => {
      state.khaled = action.payload;
    },
  },
});

export const { setToken, clearToken, setKhaled } = authSlice.actions;
export default authSlice.reducer;
