import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type Data = {
  collection: string;
  _id: string;
  createdAt: string;
  description: string;
  price: number;
  productImages: string[];
  productName: string;
  size: string;
  subCollection: string;
  amount: number;
};

const initialState: {
  product: Data[];
} = {
  product: [],
};

export const addproduct = createSlice({
  name: "product",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Data>) => {
      state.product.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      const remove = state.product.filter(
        (item) => item._id !== action.payload
      );
      state.product = [...remove];
    },
    amount: (state, action: PayloadAction<string>) => {
      state.product = state.product.map((item) =>
        item._id === action.payload
          ? { ...item, amount: item.amount ? item.amount + 1 : 1 }
          : item
      );
    },
    addamount: (state, action: PayloadAction<string>) => {
      state.product = state.product.map((item) =>
        item._id === action.payload
          ? { ...item, amount: item.amount ? item.amount + 1 : 1 }
          : item
      );
    },
    minusamount: (state, action: PayloadAction<string>) => {
      state.product = state.product.map((item) =>
        item._id === action.payload
          ? { ...item, amount: item.amount > 1 ? item.amount - 1 : 1 }
          : item
      );
    },
  },
});

export const { add, remove, amount, addamount, minusamount } =
  addproduct.actions;
