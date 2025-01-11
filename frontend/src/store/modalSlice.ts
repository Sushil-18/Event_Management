import { createSlice } from "@reduxjs/toolkit";

import { string } from "yup";
import { RootState } from ".";

const initialState = {
  isOpen: false,
  error: string,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.isOpen = true;
      state.error = action.payload;
    },
    hideModal: (state) => {
      state.isOpen = false;
      state.error = null;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
export default modalSlice.reducer;
