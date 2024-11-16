import {GetPatientResponse, ListPatientsResponse} from "../types.ts";
import axiosInstance from "../../../config/axiosConfig.ts";
import {CreatePatientSchema} from "../components/CreatePatientModal/CreatePatientForm.tsx";
import {EditPatientSchema} from "../components/EditPatientModal/EditPatientForm.tsx";

export class PatientService {
    static listPatients = async (params: any): Promise<ListPatientsResponse> => {
        const response = await axiosInstance.get<ListPatientsResponse>('/patient', {params});

        return response.data as ListPatientsResponse;
    }

    static getByUuid = async (uuid: string): Promise<GetPatientResponse> => {
        const url = `/patient/${uuid}`;
        const response = await axiosInstance.get<GetPatientResponse>(url);

        return response.data as GetPatientResponse;
    }

    static getByUserUuid = async (userUuid: string): Promise<GetPatientResponse> => {
        const url = `/patient/user/${userUuid}`;
        const response = await axiosInstance.get<GetPatientResponse>(url);

        return response.data as GetPatientResponse;
    }

    static create = async (patientData: CreatePatientSchema): Promise<void> => {
        await axiosInstance.post<GetPatientResponse>('/patient', patientData);
    }

    static update = async (uuid: string, patientData: EditPatientSchema): Promise<void> => {
        const url = `/patient/${uuid}`;
        await axiosInstance.put<GetPatientResponse>(url, patientData);
    }

    static delete = async (uuid: string): Promise<void> => {
        const url = `/patient/${uuid}`;
        await axiosInstance.delete<void>(url);
    }
}