import { createSlice } from "@reduxjs/toolkit";
import { addDays } from "date-fns";
const dateRangeSlice = createSlice({
  name: "dateRange",
  initialState: {
    from: addDays(new Date(Date.now()), -30),
    to: addDays(new Date(Date.now()), 0),
  },
  reducers: {
    setFrom: (state, action) => {
      state.from = action.payload;
    },
    setTo: (state, action) => {
      state.to = action.payload;
    },
  },
});
export const { setFrom, setTo } = dateRangeSlice.actions;
export default dateRangeSlice.reducer;
