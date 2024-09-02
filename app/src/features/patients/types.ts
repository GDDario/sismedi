import {Patient} from "./models/patient.ts";

export type OpenModal = {
    open: boolean;
    uuid: string | undefined;
}

export type ListPatientsResponse = {
    data: Patient[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number;
    to: number;
}