import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import DateRange from "./slices/DateRangeSlice";
export const store = configureStore({
  reducer: {
    Auth: authReducer,
    DateRange:DateRange
  },
  devTools:true
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
