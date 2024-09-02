import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ListPatientsResponse} from "../types.ts";
import {PatientService} from "../services/PatientService.ts";

export type PatientsType = {
    data: ListPatientsResponse | null,
    error: string | null;
    loading: boolean;
}

const initialState: PatientsType = {
    data: {
        data: [],
        current_page: 0,
        per_page: 20,
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
            console.log('Request', request)
            const response = await PatientService.listPatients(request);

            console.log('Response', response)

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Erro ao buscar os pacientes');
        }
    }
);

export const patientsSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPatients.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchPatients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// export const {hideMessage} = patientsSlice.actions;

export default patientsSlice.reducer;