import {ListDoctorsResponse, SearchDoctorsByNameResponse} from "../types.ts";
import axiosInstance from "../../../config/axiosConfig.ts";

export class DoctorService {
    static listDoctors = async (params: any): Promise<ListDoctorsResponse> => {
        const response = await axiosInstance.get<ListDoctorsResponse>('/doctor', {params});

        return response.data;
    }

    static searchByName = async (text: string): Promise<SearchDoctorsByNameResponse> => {
        const url = `/doctor/search?query=${text}`;
        const response = await axiosInstance.get<SearchDoctorsByNameResponse>(url);

        return response.data;
    }
}