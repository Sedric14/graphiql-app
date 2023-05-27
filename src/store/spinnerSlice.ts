import { createSlice } from '@reduxjs/toolkit';

export interface ISpinnerState {
  isProcess: boolean;
}

export const initialState: ISpinnerState = {
  isProcess: false,
};

const spinnerSlice = createSlice({
  name: 'spinner',
  initialState,
  reducers: {
    setOn(state) {
      return { ...state, isProcess: true };
    },
    setOff(state) {
      return { ...state, isProcess: false };
    },
  },
});

export const { setOn, setOff } = spinnerSlice.actions;
export default spinnerSlice.reducer;
