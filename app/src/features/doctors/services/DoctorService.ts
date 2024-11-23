import {GetDoctorResponse, ListDoctorsResponse, CreateOrUpdateDoctorData, SearchDoctorsByNameResponse} from "../types.ts";
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

    static getDoctor = async (uuid: string): Promise<GetDoctorResponse> => {
        const url = `/doctor/${uuid}`;
        const response = await axiosInstance.get<GetDoctorResponse>(url);

        return response.data;
    }

    static create = async (doctorData: CreateOrUpdateDoctorData): Promise<void> => {
        console.log(doctorData);
        await axiosInstance.post<GetDoctorResponse>('/doctor', doctorData);
    }

    static update = async (uuid: string, doctorData: CreateOrUpdateDoctorData): Promise<void> => {
        const url = `/doctor/${uuid}`;
        await axiosInstance.put<GetDoctorResponse>(url, doctorData);
    }

    static delete = async (uuid: string): Promise<void> => {
        const url = `/doctor/${uuid}`;
        await axiosInstance.delete<void>(url);
    }
}