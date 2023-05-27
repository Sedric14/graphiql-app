import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISysMessageState {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

const initialState: ISysMessageState[] = [];
let count = 1;

const sysMessengerSlice = createSlice({
  name: 'sysMessenger',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Omit<ISysMessageState, 'id'>>) {
      count += 1;
      state.push({ ...action.payload, id: count });
    },
    delMessage(state) {
      state.shift();
    },
  },
});

export const { addMessage, delMessage } = sysMessengerSlice.actions;
export default sysMessengerSlice.reducer;
