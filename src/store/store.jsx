import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // Local storage
const persistConfig = {
    key: 'root',
    storage,
};

import authSlice from "./slices/auth-slice";
import apiSlice from "./slices/api-slice";

const persistedReducer = persistReducer(persistConfig, combineReducers({
    auth: authSlice,
    apiUrl: apiSlice
}));

const store = configureStore({
    reducer: persistedReducer
})

const persistor = persistStore(store);
export { store, persistor };