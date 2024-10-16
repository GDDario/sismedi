import {ListDoctorsResponse} from "../types.ts";
import axiosInstance from "../../../config/axiosConfig.ts";

export class DoctorService {
    static listDoctors = async (params: any): Promise<ListDoctorsResponse> => {
        const response = await axiosInstance.get<ListDoctorsResponse>('/doctor', {params});

        return response.data;
    }
}