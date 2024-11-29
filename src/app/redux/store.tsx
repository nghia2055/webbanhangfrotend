import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "@/app/redux/slice/sliceAuth";
import { SetCollection } from "./slice/collection";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    collection: SetCollection.reducer,
  },
});

// Lấy RootState và AppDispatch để sử dụng typing
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
