import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getAll, createEntry, updateEntry, deleteEntry } from './journalAPI';

export interface JournalState {
  logged: boolean;
  journals: any[];
}

const initialState: JournalState = {
  logged: false,
  journals: [],
};

export const getAllJournals = createAsyncThunk('journal/getAll', async () => {
  const journals = await getAll();
  return journals;
});

export const createJournalEntry = createAsyncThunk('journal/createEntry', async (formData: any) => {
  const newEntry = await createEntry(formData);
  return newEntry;
});

export const updateJournalEntry = createAsyncThunk('journal/updateEntry', async (entry: any) => {
  const updatedEntry = await updateEntry(entry);
  return updatedEntry;
});

export const deleteJournalEntry = createAsyncThunk('journal/deleteEntry', async (entryId: number) => {
  await deleteEntry(entryId);
  return entryId;
});

export const journalSlice = createSlice({
  name: 'journal',
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
        state.journals = action.payload;
      })
      .addCase(createJournalEntry.fulfilled, (state, action) => {
        state.journals.push(action.payload);
      })
      .addCase(updateJournalEntry.fulfilled, (state, action) => {
        const updatedIndex = state.journals.findIndex((entry) => entry.id === action.payload.id);
        if (updatedIndex !== -1) {
          state.journals[updatedIndex] = action.payload;
        }
      })
      .addCase(deleteJournalEntry.fulfilled, (state, action) => {
        state.journals = state.journals.filter((entry) => entry.id !== action.payload);
      });
  },
});

export const { logout } = journalSlice.actions;
export const selectJournals = (state: RootState) => state.journal.journals;
export default journalSlice.reducer;
