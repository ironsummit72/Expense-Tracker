import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
export const store = configureStore({
  reducer: {
    Auth: authReducer,
  },
  devTools:true
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
