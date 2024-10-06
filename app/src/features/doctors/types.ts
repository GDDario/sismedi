import {Doctor} from "./models/doctor.ts";

export type OpenModal = {
    open: boolean;
    uuid: string | undefined;
}

export type ListDoctorsResponse = {
    data: Doctor[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number;
    to: number;
}
