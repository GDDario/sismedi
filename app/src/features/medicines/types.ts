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

export type CreateMedicineData = {
    name: string,
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
}

export type MedicineCategorySearch = {
    uuid: string;
    name: string;
};

export type SearchMedicineCategoriesResponse = {
    data: MedicineCategorySearch[];
}