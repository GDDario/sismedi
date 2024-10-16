import {GetPatientResponse, ListPatientsResponse} from "../types.ts";
import axiosInstance from "../../../config/axiosConfig.ts";

export class CityService {
    static searchCities = async (params: any): Promise<ListPatientsResponse> => {
        const response = await axiosInstance.get<ListPatientsResponse>('/patient', {params});

        return response.data;
    }
}