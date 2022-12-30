import { configureStore } from "@reduxjs/toolkit";
import dropdownSliceReducer from "./dropdownSlice";
// store
export const store = configureStore({
  reducer: {
    dropdownSliceReducer,
  },
});
