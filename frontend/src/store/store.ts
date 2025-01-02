import {configureStore} from '@reduxjs/toolkit';
import TypeReducer from '../components/features/TypeSlice';

export const store = configureStore({
    reducer: {
        TypingData :TypeReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch