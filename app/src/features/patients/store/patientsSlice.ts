import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ListPatientsResponse} from "../types.ts";
import {PatientService} from "../services/PatientService.ts";
import {redactedPatientsMockData} from "../../../../.jest/mocks/patientsMock.ts";

export type PatientsType = {
    data: ListPatientsResponse | null,
    error: string | null;
    loading: boolean;
}

const initialState: PatientsType = {
    data: {
        data: redactedPatientsMockData,
        current_page: 0,
        per_page: 17,
        total: 0,
        last_page: 0,
        from: 0,
        to: 0
    },
    error: null,
    loading: true
};

export const fetchPatients = createAsyncThunk<ListPatientsResponse, any>(
    'patients/fetchPatients',
    // @ts-ignore
    async (request, thunkAPI) => {
        try {
            return await PatientService.listPatients(request);
        } catch (error) {
            return thunkAPI.rejectWithValue('Erro ao buscar os pacientes');
        }
    }
);

export const nextPage = () => (dispatch: any, getState: any) => {
    const state = getState().patients;

    const nextPage = state.data.current_page + 1;

    if (nextPage > state.data.last_page) {
        console.warn('Already at the last page!');
        return state;
    }

    const params: object = {
        page: nextPage,
        per_page: state.data.per_page
    };

    dispatch(fetchPatients(params));
};

export const previousPage = () => (dispatch: any, getState: any) => {
    const state = getState().patients;

    const previousPage = state.data.current_page - 1;

    if (previousPage < 1) {
        console.warn('Already at the first page!');
        return state;
    }

    const params: object = {
        page: previousPage,
        per_page: state.data.per_page
    };

    dispatch(fetchPatients(params));
};

export const patientsSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPatients.fulfilled, (state, action) => {
                state.loading = false;
                // @ts-ignore
                state.data = action.payload;
            })
            .addCase(fetchPatients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default patientsSlice.reducer;