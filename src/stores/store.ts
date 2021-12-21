import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/mock';

export const store = configureStore({
  reducer: {
    mock: counterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch