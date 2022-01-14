import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICharacterType } from '../../components/createCharacter/createCharacter.type';
import axios from 'axios';
import { BASE_ROUTE } from '../../constants/apiConstants';

const initialState: ICharacterType = {
  name: '',
  userId: '',
  background: 'man.png',
  profession: 'stalker',
  city: 'moscow.jpg',
  coins: 100,
  strength: 2,
  agility: 2,
  instinct: 2,
  endurance: 2,
  accuracy: 2,
  intellect: 2,
  stats: 10,
  healthMin: 40,
  healthCurrent: 40,
  locationtime: 0,
  outside: true,
  object: '',
  coordX: 1,
  coordY: 1,
};

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setStoreCharacter: (state, action) => action.payload,
  },
});

export const storeCharacter = createAsyncThunk(
  'storeCharacterData',
  async (data: ICharacterType) => {
    await axios.post(`${BASE_ROUTE}/character/saveCharacter`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
);

export const { setStoreCharacter } = characterSlice.actions;
export default characterSlice.reducer;
