import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userReducer';
import characterSlice from './reducers/characterReducer';

export const store = configureStore({
  reducer: {
    user: userSlice,
    character: characterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
