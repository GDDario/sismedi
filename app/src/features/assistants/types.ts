import {Assistant} from "./models/assistant.ts";

export type ListAssistantsReponse = {
    data: Assistant[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number;
    to: number;
};

export type AssistantResponse = {
    uuid: string;
    name: string;
    email: string;
    cpf: string;
    level: number;
    created_at: string;
    updated_at?: string;
    email_verified_at?: string;
    deleted_at?: string;
}

export type GetAssistantResponse = {
    data: AssistantResponse;
};

export type CreateOrEditAssistantData = {
    name: string,
    email: string;
    cpf: string;
    level: number;
    password: string;
    password_confirmation: string;
}