import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createLinkApi, getClicksSummaryApi, getStatsApi } from '../api/linkApi';
import { LinkCreatedResponse, LinksState, LinkStatsResponse } from '../types/link';
import { ClickSummaryDto } from '../types/click';

const initialState: LinksState = {
  created: null,
  stats: null,
  summary: null,
  loading: false,
  error: null,
};

export const createLink = createAsyncThunk<LinkCreatedResponse, string>(
  "links/createLink",
  async (originalUrl) => {
    return await createLinkApi(originalUrl);
  }
);

export const getStats = createAsyncThunk<LinkStatsResponse, { shortCode: string; page?: number }>(
  "links/getStats",
  async ({ shortCode, page = 1 }) => getStatsApi(shortCode, page)
);

export const getClicksSummary = createAsyncThunk<ClickSummaryDto, string>(
  "links/getClicksSummary",
  async (shortCode) => getClicksSummaryApi(shortCode)
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

      .addCase(getStats.pending, (state) => { state.loading = true; state.error = null })
      .addCase(getStats.fulfilled, (state, action: PayloadAction<LinkStatsResponse>) => {
        state.loading = false; state.stats = action.payload;
      })
      .addCase(getStats.rejected, (state, action) => {
        state.loading = false; state.error = action.error?.message ?? "Ошибка при получении статистики";
      })

      .addCase(getClicksSummary.fulfilled, (state, action: PayloadAction<ClickSummaryDto>) => {
        state.summary = action.payload;
      });
  },
});

export const { clearCreated, clearError } = linksSlice.actions;
export default linksSlice.reducer;