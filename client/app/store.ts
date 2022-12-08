import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modalSlice/modalSlice";
import userSlice from "./slices/userSlice/userSlice";

export const store = configureStore({
  reducer: { modal: modalSlice, user: userSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
