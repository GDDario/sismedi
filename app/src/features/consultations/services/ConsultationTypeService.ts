import axiosInstance from "../../../config/axiosConfig.ts";
import {GetAllConsultationTypesResponse} from "../types.ts";

export class ConsultationTypeService {
    static getAll = async (): Promise<GetAllConsultationTypesResponse> => {
        const response = await axiosInstance.get<GetAllConsultationTypesResponse>('/consultation-type');

        return response.data;
    }
}