import {CreateOrEditMedicineData, GetMedicineResponse, ListMedicinesResponse} from "../types.ts";
import axiosInstance from "../../../config/axiosConfig.ts";
import {GetPatientResponse} from "../../patients/types.ts";

export class MedicineService {
    static listMedicines = async (params: any): Promise<ListMedicinesResponse> => {
        const response = await axiosInstance.get<ListMedicinesResponse>('/medicine', {params});

        return response.data as ListMedicinesResponse;
    }

    static getByUuid = async (uuid: string): Promise<GetMedicineResponse> => {
        const url: string = `/medicine/${uuid}`;
        const response = await axiosInstance.get<GetMedicineResponse>(url);

        return response.data as GetMedicineResponse;
    };

    static create = async (body: CreateOrEditMedicineData): Promise<void> => {
        await axiosInstance.post<void>('/medicine', body);
    }

    static update = async (uuid: string, medicineData: CreateOrEditMedicineData): Promise<void> => {
        const url = `/medicine/${uuid}`;
        await axiosInstance.put<GetPatientResponse>(url, medicineData);
    }

    static delete = async (uuid: string): Promise<void> => {
        const url: string = `/medicine/${uuid}`;

        await axiosInstance.delete<void>(url);
    }
}