import {SearchStatesResponse} from "../types.ts";
import axiosInstance from "../../../config/axiosConfig.ts";

export class StateService {
    static searchByName = async (text: string): Promise<SearchStatesResponse> => {
        const url = `/state/search?query=${text}`;
        const response = await axiosInstance.get<SearchStatesResponse>(url);

        return response.data;
    }
}