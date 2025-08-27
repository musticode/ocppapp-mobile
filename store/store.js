import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import chargeBoxReducer from "./reducers/chargeBoxSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chargeBox: chargeBoxReducer,
  },
});
