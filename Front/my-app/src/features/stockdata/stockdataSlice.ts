import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StockDataState {
  stockChartXValues: string[];
  stockChartYValues: number[];
  loading: boolean;
  error: string | null;
}

const initialState: StockDataState = {
  stockChartXValues: [],
  stockChartYValues: [],
  loading: false,
  error: null,
};

const stockdataSlice = createSlice({
  name: 'stockdata',
  initialState,
  reducers: {
    fetchData: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<{ xValues: string[]; yValues: number[] }>) => {
      state.loading = false;
      state.stockChartXValues = action.payload.xValues;
      state.stockChartYValues = action.payload.yValues;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchData, fetchDataSuccess, fetchDataFailure } = stockdataSlice.actions;

export default stockdataSlice.reducer;
