import { configureStore } from "@reduxjs/toolkit";
import authslice from './authslice';

const store = configureStore({
    reducer: {
        auth: authslice, // Add the auth reducer to the store
    },
});

export default store;
