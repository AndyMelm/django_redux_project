import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { login, getUserId } from './loginAPI';

export interface loginState {
  logged: boolean;
  token: string;
  userId: number | null;
  error: string;
}

const initialState: loginState = {
  logged: false,
  token: '',
  userId: null,
  error: '',
};

export const loginAsync = createAsyncThunk(
  'login/login',
  async (user1: any) => {
    console.log(user1);
    const response = await login(user1);
    console.log(response)
    return response.data;
  }
);

export const getUserIdAsync = createAsyncThunk(
  'login/getUserId',
  async (token: string) => {
    const userId = await getUserId(token);
    console.log(userId);
    return userId;
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.logged = false;
      state.token = '';
      state.userId = null;
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
      })
      .addCase(getUserIdAsync.fulfilled, (state, action) => {
        state.userId = action.payload;
      })
      .addCase(getUserIdAsync.rejected, (state, action) => {
        console.error('Failed to get user ID:', action.error.message);
        // You can handle the error here
        // For example, you can set an error message in the state
        state.error = 'Failed to retrieve user ID';
      });
  },
});

export const { logout } = loginSlice.actions;
export const selectLogged = (state: RootState) => state.login.logged;
export const selectUserId = (state: RootState) => state.login.userId;
export default loginSlice.reducer;
