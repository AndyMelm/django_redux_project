import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { register } from './RegisterAPI';

export interface registerState {
    logged: boolean;
    token: string;
    messages: string[];
    error: string;
    registrationSuccess: boolean; // New state variable
}

const initialState: registerState = {
    logged: false,
    token: '',
    messages: [],
    error: '',
    registrationSuccess: false, // Initialize it to false
};


export const registerAsync = createAsyncThunk(
    'register/register',
    async (user: any) => {
        const response = await register(user);
        return response.data;
    }
);

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        logout: (state) => {
            state.logged = false;
            state.token = '';
            sessionStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerAsync.fulfilled, (state, action) => {
            state.messages = [action.payload.message];
            state.error = '';
            state.registrationSuccess = true;
          })
          .addCase(registerAsync.rejected, (state, action) => {
            if (action.error.message) {
              state.messages = [action.error.message];
            } else {
              state.messages = [];
            }
            state.error = 'An error occurred during registration. Please try another credential';
            state.registrationSuccess = false; // Set it to false in case of rejection
          });
    },
});

export const { logout } = registerSlice.actions;
export const selectLogged = (state: RootState) => state.register.logged;
export const selectError = (state: RootState) => state.register.error;
export const selectMessages = (state: RootState) => state.register.messages;
export const selectRegSuccess = (state: RootState) => state.register.registrationSuccess;
export default registerSlice.reducer;
