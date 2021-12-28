import { createSlice } from '@reduxjs/toolkit';
import { ICharacterType } from "../../components/createCharacter/createCharacter.type";


const initialState: ICharacterType = {
  name: '',
  id: '',
  background: 'bg-manikin1.jpg',
  profession: 'stalker',
  city: 'moscow.jpg',
  coins: 100,
  skills: {
    strength: 2,
    agility: 2,
    instinct: 2,
    endurance: 2,
    accuracy: 2,
    intellect: 2,
  },
  stats: 10,
  health: [40, 40],
  locationtime: 0,
  coordinate: {
    outside: true,
    object: '',
    coordinate: [1, 1],
  },
};

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setStoreCharacter: (state, action) => action.payload,
  },
});

export const { setStoreCharacter } = characterSlice.actions;
export default characterSlice.reducer;
