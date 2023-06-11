import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Journal } from '../../Models/Journal';
import { getAlldata } from './showdataAPI';

export interface ShowdataState {
  logged: boolean;
  journalsdata: Journal[];
}

const initialState: ShowdataState = {
  logged: false,
  journalsdata: [],
};

export const getAllJournals = createAsyncThunk('journal/getAlldata', async () => {
  const journals = await getAlldata();
  return journals;
});



export const showdataSlice = createSlice({
  name: 'showdata',
  initialState,
  reducers: {
    logout: (state) => {
      state.logged = false;
      sessionStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJournals.fulfilled, (state, action) => {
        state.journalsdata = action.payload;
      })
  
  },
});
export const { logout } = showdataSlice.actions;
export const selectJournalsdata = (state: RootState) => state.showdata.journalsdata;
export default showdataSlice.reducer;
