import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IState, ICards } from "../interface/interface";
import { v4 as uuidv4 } from 'uuid';

const initialState: IState = {
	cards: [],
    loading: true,
    error: false,
};

export const fetchIcons = createAsyncThunk(
    "icons/fetchIcons", 
    async () => {
        const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=5GzfjIPVWqZsB7Vpa4AdVT6hEoGtEpECZU2fkR6Z&count=18').
                    then(data => data.json() )
                    .catch((err) => console.log(err));
        return res;
    }
)

const memorySlice = createSlice({
	name: "memory",
	initialState,
	reducers: {
        setEqualToTrue(state, action) {
            state.cards = state.cards.map((item: ICards) => {
                if (item.title === action.payload.title) {
                    return {...item, equal: true}
                } else {
                    return item;
                }
            })
        },
        setEqualToFalse(state) {
            state.cards = state.cards.map((item: ICards) => {
                return {...item, equal: false}
            })
        },
        shuffleCards(state: IState) {
            state.cards = [...state.cards].sort(() => Math.random() - 0.5);
        }
	},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIcons.pending, (state: IState) => {
                state.loading = true;
            })
            .addCase(fetchIcons.fulfilled, (state: IState, action) => {
                state.loading = false;
                state.cards = [...action.payload, ...action.payload].map((card) => {
                    return {...card, equal: false, id: uuidv4()}
                });
            })
            .addCase(fetchIcons.rejected, (state: IState) => {
                state.loading = false;
                state.error = true;
            })
    }
});
 
export const { setEqualToTrue, setEqualToFalse, shuffleCards } = memorySlice.actions;
export default memorySlice.reducer;