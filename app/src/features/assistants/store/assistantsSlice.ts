import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ListAssistantsReponse} from "../types.ts";
import {AssistantService} from "../services/AssistantService.ts";

export type AssistantsStateType = {
    data: ListAssistantsReponse | null,
    error: string | null;
    loading: boolean;
}

const initialState: AssistantsStateType = {
    data: {
        data: [],
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

export const fetchAssistants = createAsyncThunk<ListAssistantsReponse, any>(
    'assistants/fetchAssistants',
    // @ts-ignore
    async (request, thunkAPI) => {
        try {
            return await AssistantService.paginate(request);
        } catch (error) {
            return thunkAPI.rejectWithValue('Erro ao buscar os assistentes');
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

    dispatch(fetchAssistants(params));
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

    dispatch(fetchAssistants(params));
};

export const assistantsSlice = createSlice({
    name: 'assistants',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssistants.pending, (state: AssistantsStateType) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAssistants.fulfilled, (state: AssistantsStateType, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAssistants.rejected, (state: AssistantsStateType, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default assistantsSlice.reducer;