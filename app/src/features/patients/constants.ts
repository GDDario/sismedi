import {FilterType} from "../../types.ts";

export const PatientsFilters: FilterType[] = [
    {
        label: "Id",
        name: "uuid"
    },
    {
        label: "Nome",
        name: "name",
    },
    {
        label: "CPF",
        name: "cpf"
    },
    {
        label: "CNS",
        name: "cns"
    },
    {
        label: "Email",
        name: "email"
    },
    {
        label: "Data de criação",
        name: "created_at"
    }
];