import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
