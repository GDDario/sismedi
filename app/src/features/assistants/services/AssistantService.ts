import axiosInstance from "../../../config/axiosConfig.ts";
import {CreateOrEditAssistantData, GetAssistantResponse, ListAssistantsReponse} from "../types.ts";
import {EditAssistantSchema} from "../components/EditAssistantModal/EditAssistantForm.tsx";

export class AssistantService {
    static paginate = async (params: any): Promise<ListAssistantsReponse> => {
        const response = await axiosInstance.get<ListAssistantsReponse>('/assistant', {params});

        return response.data;
    }

    static getByUuid = async (uuid: string): Promise<GetAssistantResponse> => {
        const url: string = `/assistant/${uuid}`;
        const reponse = await axiosInstance.get<GetAssistantResponse>(url);

        return reponse.data;
    }

    static create = async (body: CreateOrEditAssistantData): Promise<void> => {
        await axiosInstance.post<void>('/assistant', body);
    }

    static update = async (uuid: string, assistantData: EditAssistantSchema): Promise<void> => {
        const url = `/assistant/${uuid}`;
        await axiosInstance.put<GetAssistantResponse>(url, assistantData);
    }

    static delete = async (uuid: string): Promise<void> => {
        const url: string = `/assistant/${uuid}`;

        await axiosInstance.delete<void>(url);
    }
}