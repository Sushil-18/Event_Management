import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface ModalState {
  isOpen: boolean;
  error: { message: string } | null;
}
const initialState: ModalState = {
  isOpen: false,
  error: null,
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
