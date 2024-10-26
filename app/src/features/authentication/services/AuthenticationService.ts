import axiosInstance from "../../../config/axiosConfig.ts";
import {LoginFormSchema} from "../pages/LoginPage.tsx";
import {AxiosResponse} from "axios";
import {LoginResponse, UserResponse} from "../types.ts";

export class AuthenticationService {
    static getToken = (): string | null => {
        return localStorage.getItem('token');
    };

    static saveToken = (token: string): void => {
        localStorage.setItem('token', token);
    };

    static deleteToken = (): void => {
        localStorage.removeItem('token');
    };

    static async login(credentials: LoginFormSchema): Promise<AxiosResponse<LoginResponse>> {
        return await axiosInstance.post<LoginResponse>('/login', credentials);
    };

    static async tokenLogin(): Promise<AxiosResponse<UserResponse>> {
        return await axiosInstance.get<UserResponse>('/authenticated-user');
    };

    static async logout(): Promise<void> {
        await axiosInstance.post<void>('/logout');
        this.deleteToken();
    };
}