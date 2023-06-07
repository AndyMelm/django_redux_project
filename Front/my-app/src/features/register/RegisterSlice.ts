import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {register } from './RegisterAPI';

export interface loginState {
    logged: boolean,
    token: string,
    message: string;
    error: string;
}


const initialState: loginState = {
    logged: false,
    token: '',
    message: '',
    error: '',
};

export const registerAsync = createAsyncThunk(
    'register/register',
    async (user: any) => {
        console.log(user);
        const response = await register(user);
        return response.data;
    }
);

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        logout: (state) => {
            state.logged=false
            state.token =""
            sessionStorage.clear()
        },
    },
    extraReducers: (builder) => {
      builder
        .addCase(registerAsync.fulfilled, (state, action) => {
          state.message = action.payload.message;
          state.error = '';
        })
        .addCase(registerAsync.rejected, (state) => {
          state.message = '';
          state.error = 'An error occurred during registration. Please try another credentials';
        });
    },
});

export const { logout } = registerSlice.actions;
export const selectLogged = (state: RootState) => state.register.logged;
export const selectError = (state: RootState) => state.register.error;
export const selectMessage = (state: RootState) => state.register.message;
export default registerSlice.reducer;


