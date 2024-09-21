export type UserResponse = {
    uuid: string;
    name: string;
    cpf: string;
    created_at: string;
    updated_at: string;
    type: number;
    email_verified_at?: string;
}

export type LoginResponse = {
    user: UserResponse;
    token: string;
};