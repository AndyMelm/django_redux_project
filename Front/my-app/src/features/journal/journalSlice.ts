import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getAll, createEntry, updateEntry, deleteEntry } from './journalAPI';

export interface JournalState {
  logged: boolean;
  journals: any[];
  viewedData: any | null;
}

const initialState: JournalState = {
  logged: false,
  journals: [],
  viewedData: null,
};

export const getAllJournals = createAsyncThunk('journal/getAll', async (userid: number) => {
  const journals = await getAll(userid);
  return journals;
});


export const createJournalEntry = createAsyncThunk('journal/createEntry', async (formData: any) => {
  const newEntry = await createEntry(formData);
  return newEntry;
});


export const updateJournalEntry = createAsyncThunk(
  'journal/updateEntry',
  async (updatedFields: any) => {
    const { id } = updatedFields; // Destructure the id from updatedFields
    const updatedEntry = await updateEntry(id, updatedFields);
    return updatedEntry;
  }
);




export const deleteJournalEntry = createAsyncThunk('journal/deleteEntry', async (entryId: number) => {
  await deleteEntry(entryId);
  return entryId;
});

export const updateViewJournal = createAction<any>('journal/updateViewJournal');


export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    logout: (state) => {
      state.logged = false;
      sessionStorage.clear();
    },
    setViewedData: (state, action) => {
      state.viewedData = action.payload;
    },
    closeViewedData: (state) => {
      state.viewedData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateViewJournal, (state, action) => {
        state.viewedData = action.payload;
      })
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

export const { logout, closeViewedData } = journalSlice.actions;
export const selectJournals = (state: RootState) => state.journal.journals;
export const selectViewedData = (state: RootState) => state.journal.viewedData;
export default journalSlice.reducer;
