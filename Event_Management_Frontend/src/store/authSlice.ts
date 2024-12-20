import { createSlice } from "@reduxjs/toolkit";
interface authState {
  isAuthenticated: boolean;
}
const initialState: authState = {
  isAuthenticated: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthentication: (state) => {
      state.isAuthenticated = true;
    },
    removeAuthentication: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthentication, removeAuthentication } = authSlice.actions;

export default authSlice.reducer;
