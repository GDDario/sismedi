import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ListDoctorsResponse} from "../types.ts";
import {DoctorService} from "../services/DoctorService.ts";
import {redactedDoctorsMockData} from "../../../../.jest/mocks/doctorsMock.ts";

export type DoctorsType = {
    data: ListDoctorsResponse | null,
    error: string | null;
    loading: boolean;
}

const initialState: DoctorsType = {
    data: {
        data: redactedDoctorsMockData,
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

export const fetchDoctors = createAsyncThunk<ListDoctorsResponse, any>(
    'doctors/fetchDoctors',
    // @ts-ignore
    async (request, thunkAPI) => {
        try {
            return await DoctorService.listDoctors(request);
        } catch (error) {
            return thunkAPI.rejectWithValue('Erro ao buscar os médicos');
        }
    }
);

export const nextPage = () => (dispatch: any, getState: any) => {
    const state = getState().doctors;

    const nextPage = state.data.current_page + 1;

    if (nextPage > state.data.last_page) {
        console.warn('Already at the last page!');
        return state;
    }

    const params: object = {
        page: nextPage,
        per_page: state.data.per_page
    };

    dispatch(fetchDoctors(params));
};

export const previousPage = () => (dispatch: any, getState: any) => {
    const state = getState().doctors;

    const previousPage = state.data.current_page - 1;

    if (previousPage < 1) {
        console.warn('Already at the first page!');
        return state;
    }

    const params: object = {
        page: previousPage,
        per_page: state.data.per_page
    };

    dispatch(fetchDoctors(params));
};

export const doctorsSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoctors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDoctors.fulfilled, (state, action) => {
                state.loading = false;
                // @ts-ignore
                state.data = action.payload;
            })
            .addCase(fetchDoctors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default doctorsSlice.reducer;