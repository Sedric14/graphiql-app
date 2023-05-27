import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IDocPanelState {
  isDrawerVisible: boolean;
  isLoading: boolean;
}

export const initialState: IDocPanelState = {
  isDrawerVisible: false,
  isLoading: false,
};

const docPanelSlice = createSlice({
  name: 'docPanel',
  initialState,
  reducers: {
    setIsDrawerVisible(state, action: PayloadAction<boolean>) {
      return { ...state, isDrawerVisible: action.payload };
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      return { ...state, isLoading: action.payload };
    },
  },
});

export const { setIsDrawerVisible, setIsLoading } = docPanelSlice.actions;
export default docPanelSlice.reducer;
