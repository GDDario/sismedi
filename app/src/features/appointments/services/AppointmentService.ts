import axiosInstance from "../../../config/axiosConfig.ts";
import {CreateAppointmentByPatient, ListAppointmentsReponse} from "../types.ts";

export class AppointmentService {
    static paginate = async (params: any): Promise<ListAppointmentsReponse> => {
        const response = await axiosInstance.get<ListAppointmentsReponse>('/appointment', {params});

        return response.data;
    }

    static getByUuid = async (uuid: string): Promise<GetAssistantResponse> => {
        const url: string = `/assistant/${uuid}`;
        const reponse = await axiosInstance.get<GetAssistantResponse>(url);

        return reponse.data;
    }

    static create = async (body: CreateAppointmentByPatient): Promise<void> => {
        await axiosInstance.post<void>('/appointment', body);
    }

    static update = async (uuid: string, assistantData: CreateOrEditAssistantData): Promise<void> => {
        const url = `/assistant/${uuid}`;
        await axiosInstance.put<GetAssistantResponse>(url, assistantData);
    }

    static delete = async (uuid: string): Promise<void> => {
        const url: string = `/assistant/${uuid}`;

        await axiosInstance.delete<void>(url);
    }
}