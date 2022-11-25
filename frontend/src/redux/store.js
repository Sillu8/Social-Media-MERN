import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {loadSlice} from "./loading/loadSlice";


const rootReducer = combineReducers({
    alerts: loadSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
})

