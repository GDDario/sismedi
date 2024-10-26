import {GetPatientResponse, ListPatientsResponse, CreateOrUpdatePatientData} from "../types.ts";
import axiosInstance from "../../../config/axiosConfig.ts";

export class PatientService {
    static listPatients = async (params: any): Promise<ListPatientsResponse> => {
        const response = await axiosInstance.get<ListPatientsResponse>('/patient', {params});

        return response.data;
    }

    static getPatient = async (uuid: string): Promise<GetPatientResponse> => {
        const url = `/patient/${uuid}`;
        const response = await axiosInstance.get<GetPatientResponse>(url);

        return response.data;
    }

    static create = async (patientData: CreateOrUpdatePatientData): Promise<void> => {
        await axiosInstance.post<GetPatientResponse>('/patient', patientData);
    }

    static update = async (uuid: string, patientData: CreateOrUpdatePatientData): Promise<void> => {
        const url = `/patient/${uuid}`;
        await axiosInstance.put<GetPatientResponse>(url, patientData);
    }

    static delete = async (uuid: string): Promise<void> => {
        const url = `/patient/${uuid}`;
        await axiosInstance.delete<void>(url);
    }
}