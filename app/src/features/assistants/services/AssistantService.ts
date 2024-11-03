import axiosInstance from "../../../config/axiosConfig.ts";
import {CreateOrEditAssistantData, GetAssistantResponse, ListAssistantsReponse} from "../types.ts";

export class AssistantService {
    static paginate = async (params: any): Promise<ListAssistantsReponse> => {
        const response = await axiosInstance.get<ListAssistantsReponse>('/assistant', {params});

        return response.data;
    }

    // static getByUuid = async (uuid: string): Promise<GetMedicineResponse> => {
    //     const url: string = `/medicine/${uuid}`;
    //     const reponse = await axiosInstance.get<GetMedicineResponse>(url);
    //
    //     return reponse.data;
    // }
    //
    static create = async (body: CreateOrEditAssistantData): Promise<void> => {
        await axiosInstance.post<void>('/assistant', body);
    }

    static update = async (uuid: string, medicineData: CreateOrEditAssistantData): Promise<void> => {
        const url = `/assistant/${uuid}`;
        await axiosInstance.put<GetAssistantResponse>(url, medicineData);
    }
    //
    // static delete = async (uuid: string): Promise<void> => {
    //     const url: string = `/medicine/${uuid}`;
    //
    //     await axiosInstance.delete<void>(url);
    // }
}