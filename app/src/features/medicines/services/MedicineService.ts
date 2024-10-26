import {ListMedicinesResponse} from "../types.ts";
import axiosInstance from "../../../config/axiosConfig.ts";

export class MedicineService {
    static listMedicines = async (params: any): Promise<ListMedicinesResponse> => {
        const response = await axiosInstance.get<ListMedicinesResponse>('/medicine', {params});

        return response.data;
    }
}