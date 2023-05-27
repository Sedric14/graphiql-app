import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import sendQueryRequestGraphQL from '../GraphQL/RequestGraphQL';

export interface IGraphQL {
  url: string;
  variables: string;
  headers: string;
  data: JSON | null;
  error: string | JSON;
  isLoading: boolean;
}

const initialState: IGraphQL = {
  url: import.meta.env.VITE_API_DEFAULT_GRAPHQL,
  variables: JSON.stringify({ page: 2, name: 'rick' }),
  headers: JSON.stringify({
    'Content-Type': 'application/json',
  }),
  data: null,
  error: '',
  isLoading: false,
};

const graphQLSlice = createSlice({
  name: 'graphQL',
  initialState,
  reducers: {
    changeRoute(state, action: PayloadAction<string>) {
      /* eslint no-param-reassign: "error" */
      state.url = action.payload;
    },
    changeVariables(state, action: PayloadAction<string>) {
      state.variables = action.payload;
    },
    changeHeaders(state, action: PayloadAction<string>) {
      state.headers = action.payload;
    },

    changeErrors(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearData(state) {
      state.data = null;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(sendQueryRequestGraphQL.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = '';
        state.isLoading = false;
      })
      .addCase(sendQueryRequestGraphQL.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendQueryRequestGraphQL.rejected, (state, action: PayloadAction<unknown>) => {
        if (action.payload instanceof Error) {
          state.error = action.payload.message;
        } else if (typeof action.payload === 'object') {
          state.error = action.payload as JSON;
        } else {
          state.error = 'API loading error ';
        }
        state.isLoading = false;
      });
  },
});

export const { changeRoute, changeVariables, clearData, changeHeaders, changeErrors } =
  graphQLSlice.actions;
export default graphQLSlice.reducer;
