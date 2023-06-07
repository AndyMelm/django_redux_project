import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { login } from './loginAPI';

export interface loginState {
  logged: boolean;
  token: string;
  error: string;
}

const initialState: loginState = {
  logged: false,
  token: '',
  error: '',
};

export const loginAsync = createAsyncThunk(
  'login/login',
  async (user: any) => {
    console.log(user);
    const response = await login(user);
    console.log(response);
    return response.data;
  }
);


export const loginSlice = createSlice({
  name: 'login',
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
      .addCase(loginAsync.fulfilled, (state, action) => {
        if (action.payload.access.length > 0) {
          state.logged = true;
          state.token = action.payload.access;
          sessionStorage.setItem('token', state.token);
          console.log(sessionStorage.getItem('token'))
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        console.error('Login failed:', action.error.message);
        // You can handle the error here
        // For example, you can set an error message in the state
        state.error = 'Incorrect username or password';
      });
  },
});

export const { logout } = loginSlice.actions;
export const selectLogged = (state: RootState) => state.login.logged;
export default loginSlice.reducer;
