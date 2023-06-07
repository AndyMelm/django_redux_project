import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/login/loginSlice';
import registerReducer from '../features/register/RegisterSlice';
import journalReducer from '../features/journal/journalSlice';
import crudSlice from '../features/CRUD/crudSlice';
import Crud3Slice from '../features/Crud3/Crud3Slice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    register: registerReducer,
    journal: journalReducer,
    CRUD:crudSlice,
    crud:Crud3Slice
   
    
 
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
