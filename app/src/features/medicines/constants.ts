import {FilterType} from "../../types.ts";

export const MedicinesFilters: FilterType[] = [
    {
        label: "Id",
        name: "uuid"
    },
    {
        label: "Nome",
        name: "name",
    },
    {
        label: "Categoria",
        name: "category"
    },
    {
        label: "Concentração",
        name: "concentration"
    },
    {
        label: "Quantidade",
        name: "quantity"
    },
    {
        label: "Preço",
        name: "price"
    },
    {
        label: "Data de expiração",
        name: "expiration_date"
    }
];