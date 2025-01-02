import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TypeState {
  WordPerMinute: number;
  TypingAccuracy: number;
  TimeTaken: number
}

const initialState: TypeState[] = [
  {
    WordPerMinute: 0,
    TypingAccuracy: 0, //in percentage
    TimeTaken: 0, //in minutes
  },
];

export const TypeSlice = createSlice({
    name: 'TypingData',
    initialState,
    reducers : {
        setData: (state,action: PayloadAction<TypeState>) => {
            state.push(action.payload);
        }
    }
})

export const {setData} = TypeSlice.actions;
export default TypeSlice.reducer;
