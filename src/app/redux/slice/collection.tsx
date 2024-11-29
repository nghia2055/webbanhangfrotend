import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const SetCollection = createSlice({
  name: "collection",
  initialState: {
    Collection: "trangchu",
  },
  reducers: {
    collection: (state, action: PayloadAction<string>) => {
      state.Collection = action.payload;
    },
  },
});

export const { collection } = SetCollection.actions;
