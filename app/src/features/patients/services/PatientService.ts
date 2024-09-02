import {ListPatientsResponse} from "../types.ts";
import axiosInstance from "../../../config/axiosConfig.ts";

export class PatientService {
    static listPatients = async (params: any): Promise<ListPatientsResponse> => {
        const response = await axiosInstance.get<ListPatientsResponse>('/patient?page=', {params});

        return response.data;
    }
}