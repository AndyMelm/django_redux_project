import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
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
    const response = await login(user1);
    return response.data;
  }
);

export const getUserIdAsync = createAsyncThunk(
  'login/getUserId',
  async (token: string) => {
    const userId = await getUserId(token);
    return userId;
  }
);

export const navigateToHome = () => {
  window.location.href = 'http://localhost:3000/';
};


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
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        console.error('Login failed:', action.error.message);
        state.error = 'Incorrect username or password';
      })
      .addCase(getUserIdAsync.fulfilled, (state, action) => {
        state.userId = action.payload;
      })
      .addCase(getUserIdAsync.rejected, (state, action) => {
        console.error('Failed to get user ID:', action.error.message);
        state.error = 'Failed to retrieve user ID';
        navigateToHome();
      });
  },
});

export const { logout } = loginSlice.actions;
export const selectLogged = (state: RootState) => state.login.logged;
export const selectUserId = (state: RootState) => state.login.userId;
export const selectToken = (state: RootState) => state.login.token;
export default loginSlice.reducer;
