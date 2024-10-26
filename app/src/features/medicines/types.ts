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