import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./auth/userSlice";
import { loadSlice } from "./loading/loadSlice";



const rootReducer = combineReducers({
    alerts: loadSlice.reducer,
    userData: userSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
})

