import {configureStore} from "@reduxjs/toolkit";
import userReducer from '../features/authentication/store/userSlice';
import pageReducer from '../store/pageSlice';
import messageReducer from '../store/messageSlice';
import patientsReducer from '../features/patients/store/patientsSlice';
import doctorsReducer from '../features/doctors/store/doctorsSlice';
import medicinesReducer from '../features/medicines/store/medicinesSlice';
import assistantsReducer from '../features/assistants/store/assistantsSlice.ts';
import appointmentsReducer from '../features/appointments/store/appointmentsSlice.ts';

export const store = configureStore(
    {
        reducer: {
            user: userReducer,
            page: pageReducer,
            message: messageReducer,
            patients: patientsReducer,
            doctors: doctorsReducer,
            medicines: medicinesReducer,
            assistants: assistantsReducer,
            appointments: appointmentsReducer,
        }
    }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;