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
    setCredentials: (state, action) => {
      state.login = action.payload.login;
      state.password = action.payload.password;
    }
  },
});

export const { setCredentials } = userSlice.actions;
export default userSlice.reducer;
