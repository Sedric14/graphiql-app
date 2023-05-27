import { createSlice } from '@reduxjs/toolkit';

export interface ISignState {
  isSignIn: boolean;
}

export const initialState: ISignState = {
  isSignIn: true,
};

const signSlice = createSlice({
  name: 'sign',
  initialState,
  reducers: {
    setSignIn(state) {
      return { ...state, isSignIn: true };
    },
    setSignUp(state) {
      return { ...state, isSignIn: false };
    },
  },
});

export const { setSignIn, setSignUp } = signSlice.actions;
export default signSlice.reducer;
