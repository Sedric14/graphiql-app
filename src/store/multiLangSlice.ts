import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Langs = 'EN' | 'UA';

export interface IMultiLangState {
  lang: Langs;
}

export const initialState: IMultiLangState = {
  lang: 'EN',
};

const multiLangSlice = createSlice({
  name: 'multiLang',
  initialState,
  reducers: {
    setLang(state, action: PayloadAction<Langs>) {
      return { ...state, lang: action.payload };
    },
  },
});

export const { setLang } = multiLangSlice.actions;
export default multiLangSlice.reducer;
