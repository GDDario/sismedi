import axiosInstance from "../../../config/axiosConfig.ts";
import {
    UpdateAppointmentData,
    GetAppointmentResponse,
    ListAppointmentsReponse,
    CreateAppointmentByPatient
} from "../types.ts";

export class AppointmentService {
    static paginate = async (params: any): Promise<ListAppointmentsReponse> => {
        const response = await axiosInstance.get<ListAppointmentsReponse>('/appointment', {params});

        return response.data;
    }

    static getByUuid = async (uuid: string): Promise<GetAppointmentResponse> => {
        const url: string = `/appointment/${uuid}`;
        const reponse = await axiosInstance.get<GetAppointmentResponse>(url);

        return reponse.data;
    }

    static create = async (body: CreateAppointmentByPatient): Promise<void> => {
        await axiosInstance.post<GetAppointmentResponse>('/appointment', body);
    }

    static update = async (uuid: string, appointmentData: UpdateAppointmentData): Promise<void> => {
        const url = `/appointment/${uuid}`;
        await axiosInstance.put<GetAppointmentResponse>(url, appointmentData);
    }

    static delete = async (uuid: string): Promise<void> => {
        const url: string = `/appointment/${uuid}`;

        await axiosInstance.delete<void>(url);
    }
}