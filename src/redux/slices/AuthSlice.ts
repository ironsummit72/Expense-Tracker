import { createSlice } from "@reduxjs/toolkit";

interface AuthenticationState {
  isUserAuthenticated: boolean;
  userData: {
    id:string
    username: string;
    email: string;
  } | null;
}
const initialState: AuthenticationState = {
  isUserAuthenticated: true,
  userData: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isUserAuthenticated = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isUserAuthenticated = false;
      state.userData = null;
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
