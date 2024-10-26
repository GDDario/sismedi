import {createSlice} from '@reduxjs/toolkit';

export const pageSlice = createSlice({
    name: 'page',
    initialState: {
        title: '',
    },
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
    },
});

export const {setTitle} = pageSlice.actions;
export const selectTitle = (state: any) => state.page.title;

export default pageSlice.reducer;