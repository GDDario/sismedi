import {GetPatientResponse, ListPatientsResponse, UpdatePatientData} from "../types.ts";
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

    static update = async (uuid: string, patientData: UpdatePatientData): Promise<void> => {
        const url = `/patient/${uuid}`;
        await axiosInstance.put<GetPatientResponse>(url, patientData);
    }

}