export type Patient = {
    uuid: string;
    name: string;
    cpf: string;
    cns: string;
    rg: string;
    email: string;
    birth_date: Date | string;
    created_at: Date | string;
    email_verified_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string;
}
