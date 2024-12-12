import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    admin: false,
    login: false,
    user: {},
  },
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<{
        admin: boolean;
        login: boolean;
        user: { email: string; user: string };
      }>
    ) => {
      state.admin = action.payload.admin;
      state.login = action.payload.login;
      state.user = action.payload.user;
    },
  },
});

export const { setLogin } = authSlice.actions;
