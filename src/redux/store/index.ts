import { configureStore } from '@reduxjs/toolkit';
import overlaySlice from '../slices/overlaySlice';

export const store = configureStore({
  reducer: {
    overlay: overlaySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
