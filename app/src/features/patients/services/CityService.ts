import {SearchCitiesResponse} from "../types.ts";
import axiosInstance from "../../../config/axiosConfig.ts";

export class CityService {
    static searchByNameAndState = async (text: string, stateUuid: string): Promise<SearchCitiesResponse> => {
        const url = `/city/search?query=${text}&state_uuid=${stateUuid}`;
        const response = await axiosInstance.get<SearchCitiesResponse>(url);

        return response.data;
    }
}