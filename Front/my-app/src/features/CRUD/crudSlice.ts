import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Journal2 } from '../../Models/Journal2';
import {getAll,add,deleteProd, upd } from './crudAPI';

export interface loginState {
    logged: boolean,
    products:Journal2[]    
}

const initialState: loginState = {
    logged: false,
    products: []
};

export const getAllAsync = createAsyncThunk(
    'CRUD/getAll',
    async () => {
        const response = await getAll();
        return response.data;
    }
);
export const delAsync = createAsyncThunk(
    'CRUD/deleteProd',
    async (id:number) => {
        console.log("ttttttttttttttttttttttttttttttttttttttttttest",id);
        const response = await deleteProd(id);
        return id;
    }
);
export const addAsync = createAsyncThunk(
    'CRUD/add',
    async (product:Journal2) => {
        console.log("addddd");
        const response = await add(product);
        console.log(response);
        console.log(product);
        return response.data;
    }
);
export const updAsync = createAsyncThunk(
    'CRUD/upd',
    async (product:Journal2) => {
        console.log("upd");
        const response = await upd(product);
        return response.data;
    }
);

export const CRUDSlice = createSlice({
    name: 'CRUD',
    initialState,
    reducers: {
        logout: (state) => {
            state.logged=false
           
            sessionStorage.clear()
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllAsync.fulfilled, (state, action) => {
                state.products=action.payload
            }).addCase(addAsync.fulfilled, (state, action) => {
                console.log(action.payload);
                 state.products.push(action.payload)
            }).addCase(delAsync.fulfilled, (state, action) => {
                console.log(action.payload);
                 state.products= state.products.filter(pro => pro.id != action.payload)
            })
            .addCase(updAsync.fulfilled, (state, action) => {
                const current= state.products.findIndex(pro => pro.id == action.payload.id)
                state.products[current]=action.payload
            })


    },
});

export const { logout } = CRUDSlice.actions;
export const selectProducts = (state: RootState) => state.CRUD.products;
export default CRUDSlice.reducer;
