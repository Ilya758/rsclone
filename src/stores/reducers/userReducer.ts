import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  login: string;
  password: string;
}

const initialState: IUser = {
  login: '',
  password: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => action.payload
  },
});

export const { setCredentials } = userSlice.actions;
export default userSlice.reducer;
