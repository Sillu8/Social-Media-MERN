import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAdmin } from '../authService';

export const fetchAdminData = createAsyncThunk('admin/fetchAdmin',
    async (token, thunkAPI) => {
        try {
            return await getAdmin(token);
        } catch (error) {
            const message = (
                error.response && 
                error.response.data &&
                error.response.data.message) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const adminSlice = createSlice({
    name: 'adminData',
    initialState: {
        admin: null
    },
    reducers: {
        setAdmin: (state,action) => {
            state.admin = action.payload
        },
        clearAdmin: (state) => {
            state.admin = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAdminData.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAdminData.fulfilled, (state,action) => {
            state.loading = false;
            state.admin = action.payload.data.admin;
        })
        .addCase(fetchAdminData.rejected, (state,action) => {
            state.loading = false;
            state.admin = null;
            state.message = action.payload;
            localStorage.removeItem('adminToken');
        });
    },

})


export const { setAdmin, clearAdmin } = adminSlice.actions


