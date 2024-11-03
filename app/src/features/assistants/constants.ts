import {FilterType} from "../../types.ts";

export const AssistantsFilters: FilterType[] = [
    {
        label: "Id",
        name: "uuid"
    },
    {
        label: "Nome",
        name: "name"
    },
    {
        label: "Email",
        name: "email"
    },
    {
        label: "Nível",
        name: "level"
    },
    {
        label: "Data de criação",
        name: "created_at"
    }
];