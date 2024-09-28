import {createSlice} from "@reduxjs/toolkit";
import {User} from "../models/user.ts";

const initialState: User = {
    uuid: '',
    username: '',
    email: '',
    picture_path: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (_state, {payload}) => {
            // console.log('user payload', payload)
            return payload;
        },
    }
});

export const selectUser = (state: any) => state.user;
export const {setUser} = userSlice.actions;

export default userSlice.reducer;