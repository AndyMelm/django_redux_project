import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/login/loginSlice';
import registerReducer from '../features/register/RegisterSlice';
import journalReducer from '../features/journal/journalSlice';



export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    register: registerReducer,
    journal: journalReducer, 
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
