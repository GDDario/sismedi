import {CreateOrEditMedicineData, ListMedicinesResponse, SearchMedicineCategoriesResponse} from "../types.ts";
import axiosInstance from "../../../config/axiosConfig.ts";

export class MedicineCategoryService {
    static searchByName = async (text: string): Promise<SearchMedicineCategoriesResponse> => {
        const url = `medicine-category/search?query=${text}`;
        const response = await axiosInstance.get<SearchMedicineCategoriesResponse>(url);

        return response.data;
    }
}