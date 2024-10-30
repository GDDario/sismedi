import {configureStore} from "@reduxjs/toolkit";
import userReducer from '../features/authentication/store/userSlice';
import pageReducer from '../store/pageSlice';
import messageReducer from '../store/messageSlice';
import patientsReducer from '../features/patients/store/patientsSlice';
import doctorsReducer from '../features/doctors/store/doctorsSlice';
import medicinesReducer from '../features/medicines/store/medicinesSlice';

export const store = configureStore(
    {
        reducer: {
            user: userReducer,
            page: pageReducer,
            message: messageReducer,
            patients: patientsReducer,
            doctors: doctorsReducer,
            medicines: medicinesReducer
        }
    }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;