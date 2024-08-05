import {configureStore} from "@reduxjs/toolkit";
import userReducer from '../features/authentication/store/userSlice';

const store = configureStore(
    {
        reducer: {
            user: userReducer,
        }
    }
);

export default store;