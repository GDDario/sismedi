import {configureStore} from "@reduxjs/toolkit";
import userReducer from '../features/authentication/store/userSlice';
import messageReducer from '../store/messageSlice.ts';

const store = configureStore(
    {
        reducer: {
            user: userReducer,
            message: messageReducer
        }
    }
);

export default store;