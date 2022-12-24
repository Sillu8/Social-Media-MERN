import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./auth/userSlice";
import { loadSlice } from "./loading/loadSlice";
import { adminSlice } from './auth/adminSlice';


const rootReducer = combineReducers({
    alerts: loadSlice.reducer,
    userData: userSlice.reducer,
    adminData: adminSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
})

