export type LoginResponse = {
    user: {
        uuid: string;
        name: string;
        cpf: string;
        created_at: string;
        updated_at: string;
        type: number;
        email_verified_at?: string;
    };
    token: string;
};