import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type data = {
  admin: boolean;
  login: boolean;
  user: {
    user: string;
    email: string;
  };
};

const initialState: data = {
  admin: false,
  login: false,
  user: {
    user: "",
    email: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
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
