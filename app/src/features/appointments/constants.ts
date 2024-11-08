import {FilterType} from "../../types.ts";

export const AppointmentsFilters: FilterType[] = [
    {
        label: "Id",
        name: "uuid"
    },
    {
        label: "Id do paciente",
        name: "patient_uuid"
    },
    {
        label: "Nome do paciente",
        name: "patient_name"
    },
    {
        label: "Id do médico",
        name: "doctor_uuid"
    },
    {
        label: "Nome do médico",
        name: "doctor_name"
    }
];