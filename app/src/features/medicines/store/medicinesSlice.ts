import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ListMedicinesResponse} from "../types.ts";
import {MedicineService} from "../services/MedicineService.ts";
import {redactedPatientsMockData} from "../../../../.jest/mocks/patientsMock.ts";

export type MedicinesStateType = {
    data: ListMedicinesResponse | null,
    error: string | null;
    loading: boolean;
}

const initialState: MedicinesStateType = {
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

export const fetchMedicines = createAsyncThunk<ListMedicinesResponse, any>(
    'patients/fetchMedicines',
    // @ts-ignore
    async (request, thunkAPI) => {
        try {
            return await MedicineService.listMedicines(request);
        } catch (error) {
            return thunkAPI.rejectWithValue('Erro ao buscar os medicamentos');
        }
    }
);

export const nextPage = () => (dispatch: any, getState: any) => {
    const state = getState().medicines;

    const nextPage = state.data.current_page + 1;

    if (nextPage > state.data.last_page) {
        console.warn('Already at the last page!');
        return state;
    }

    const params: object = {
        page: nextPage,
        per_page: state.data.per_page
    };

    dispatch(fetchMedicines(params));
};

export const previousPage = () => (dispatch: any, getState: any) => {
    const state = getState().medicines;

    const previousPage = state.data.current_page - 1;

    if (previousPage < 1) {
        console.warn('Already at the first page!');
        return state;
    }

    const params: object = {
        page: previousPage,
        per_page: state.data.per_page
    };

    dispatch(fetchMedicines(params));
};

export const medicinesSlice = createSlice({
    name: 'medicines',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMedicines.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMedicines.fulfilled, (state, action) => {
                state.loading = false;
                // @ts-ignore
                state.data = action.payload;
            })
            .addCase(fetchMedicines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default medicinesSlice.reducer;