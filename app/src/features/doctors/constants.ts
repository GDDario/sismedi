import {FilterType} from "../../types.ts";

export const DoctorsFilters: FilterType[] = [
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
        label: "CRM",
        name: "crm"
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