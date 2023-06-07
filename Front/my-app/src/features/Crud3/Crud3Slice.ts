import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Journal } from '../../Models/Crud3';
import { getAllJournals, addJournal, updateJournal, deleteJournal } from './Crud3API';

export const getAllAsync = createAsyncThunk('crud/getAllAsync', async () => {
  const response = await getAllJournals();
  return response;
});

export const addAsync = createAsyncThunk('crud/addAsync', async (journal: Journal) => {
  const response = await addJournal(journal);
  return response;
});

export const updateAsync = createAsyncThunk('crud/updateAsync', async (data: { id: number; journal: Journal }) => {
  const { id, journal } = data;
  const response = await updateJournal(id, journal);
  return response;
});

export const deleteAsync = createAsyncThunk('crud/deleteAsync', async (id: number) => {
  await deleteJournal(id);
  return id;
});

interface CrudState {
  journals: Journal[];
  loading: boolean;
  error: string | null;
}

const initialState: CrudState = {
  journals: [],
  loading: false,
  error: null,
};

const crud3Slice = createSlice({
  name: 'crud',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.journals = action.payload;
        state.error = null;
      })
      .addCase(getAllAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error occurred while fetching journals.';
      })
      .addCase(addAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.journals.push(action.payload);
        state.error = null;
      })
      .addCase(addAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error occurred while adding journal.';
      })
      .addCase(updateAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedJournal = action.payload;
        const index = state.journals.findIndex((journal) => journal.id === updatedJournal.id);
        if (index !== -1) {
          state.journals[index] = updatedJournal;
        }
        state.error = null;
      })
      .addCase(updateAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error occurred while updating journal.';
      })
      .addCase(deleteAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload;
        state.journals = state.journals.filter((journal) => journal.id !== deletedId);
        state.error = null;
      })
      .addCase(deleteAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error occurred while deleting journal.';
      });
  },
});

export const selectJournals = (state: { crud: CrudState }) => state.crud.journals;
export const selectLoading = (state: { crud: CrudState }) => state.crud.loading;
export const selectError = (state: { crud: CrudState }) => state.crud.error;

export default crud3Slice.reducer;
