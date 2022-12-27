import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import { getUser } from '../authService';

export const fetchUserData = createAsyncThunk('user/fetchUser',
    async (token, thunkAPI) => {
        try {
            return await getUser(token);
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

export const userSlice = createSlice({
    name: 'userData',
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state,action) => {
            state.user = action.payload
        },
        clearUser: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchUserData.fulfilled, (state,action) => {
            state.loading = false;
            state.user = action.payload.data.user;
        })
        .addCase(fetchUserData.rejected, (state,action) => {
            state.loading = false;
            state.user = null;
            state.message = action.payload;
            localStorage.removeItem('token');
            toast.error(state.message);
        });
    },

})


export const { setUser, clearUser } = userSlice.actions


