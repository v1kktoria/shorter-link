import { configureStore } from "@reduxjs/toolkit";
import linksReducer from '../entities/link/model/linksSlice';

export const store = configureStore({
    reducer: {
        links: linksReducer,
    },
    devTools: process.env.NODE_ENV !== "production"
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;