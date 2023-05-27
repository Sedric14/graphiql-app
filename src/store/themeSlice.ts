import { createSlice } from '@reduxjs/toolkit';

export interface IThemeState {
  isDarkMode: boolean;
}

export const initialState: IThemeState = {
  isDarkMode: true,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setLightTheme(state) {
      return { ...state, isDarkMode: false };
    },
    setDarkTheme(state) {
      return { ...state, isDarkMode: true };
    },
    changeTheme(state) {
      return { ...state, isDarkMode: !state.isDarkMode };
    },
  },
});

export const { setLightTheme, setDarkTheme, changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
