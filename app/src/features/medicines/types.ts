import {Medicine} from "./models/medicine.ts";

export type ListMedicinesResponse = {
    data: Medicine[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number;
    to: number;
};

export type CreateOrEditMedicineData = {
    name: string,
    quantity: number
    expiration_date: string;
    manufacturer: string;
    batch_number: string;
    price: number;
    category_uuid: string;
    dosage: string;
    concentration: number;
    prescription: string;
    description?: string;
}

export type MedicineCategorySearch = {
    uuid: string;
    name: string;
};

export type SearchMedicineCategoriesResponse = {
    data: MedicineCategorySearch[];
}

export type MedicineResponse = {
    uuid: string;
    name: string;
    quantity: number
    expiration_date: string;
    manufacturer: string;
    batch_number: string;
    price: number;
    category_uuid: string;
    dosage?: string;
    concentration?: number;
    prescription?: string;
    description?: string;
    created_at: string;
    updated_at: string;
    category: {
        uuid: string;
        name: string;
        description: string;
        created_at: string;
        updated_at: string;
    }
}

export type GetMedicineResponse = {
    data: MedicineResponse
};