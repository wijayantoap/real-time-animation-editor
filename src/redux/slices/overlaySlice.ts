import { createSlice } from '@reduxjs/toolkit';

export interface OverlayState {
  showBackdrop: boolean;
  showForm: boolean;
}

const initialState: OverlayState = {
  showBackdrop: false,
  showForm: false,
};

export const counterSlice = createSlice({
  name: 'overlay',
  initialState,
  reducers: {
    toggleBackdrop: (state) => {
      state.showBackdrop = !state.showBackdrop;
    },
    toggleForm: (state) => {
      state.showForm = !state.showForm;
    },
  },
});

export const { toggleBackdrop, toggleForm } = counterSlice.actions;

export default counterSlice.reducer;
