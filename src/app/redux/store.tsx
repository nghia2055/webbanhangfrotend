import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // sử dụng localStorage để lưu trạng thái
import { combineReducers } from "redux"; // Import combineReducers
import { authSlice } from "../../app/redux/slice/sliceAuth";
import { SetCollection } from "./slice/collection";
import { addproduct } from "../redux/slice/sliceaddproduct";

// Cấu hình Redux Persist
const persistConfig = {
  key: "root", // key lưu trữ trong localStorage
  storage, // sử dụng localStorage để lưu trạng thái
};

// Kết hợp tất cả reducers vào một rootReducer
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  collection: SetCollection.reducer,
  addproduct: addproduct.reducer,
});

// Dùng persistReducer với rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Dùng persistedReducer cho toàn bộ state
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Tắt kiểm tra giá trị không tuần tự hóa
    }),
});

export const persistor = persistStore(store);

// Lấy RootState và AppDispatch để sử dụng typing
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
