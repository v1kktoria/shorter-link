import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LinkCreatedResponse, LinksState} from '../types';
import { createLinkApi } from '../api/linkApi';

const initialState: LinksState = {
  created: null,
  loading: false,
  error: null,
};

export const createLink = createAsyncThunk<LinkCreatedResponse, string>(
  "links/createLink",
  async (originalUrl) => {
    return await createLinkApi(originalUrl);
  }
);

const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    clearCreated(state) {
      state.created = null;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLink.fulfilled, (state, action: PayloadAction<LinkCreatedResponse>) => {
        state.loading = false;
        state.created = action.payload;
      })
      .addCase(createLink.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error?.message ?? "Неизвестная ошибка");
      })
  },
});

export const { clearCreated, clearError } = linksSlice.actions;
export default linksSlice.reducer;