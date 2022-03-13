import { configureStore } from "@reduxjs/toolkit";
import memorySlice from "./slice";

const store = configureStore({
  reducer: memorySlice,
});

export default store;