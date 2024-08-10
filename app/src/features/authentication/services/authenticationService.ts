import axiosInstance from "../../../config/axiosConfig.ts";
import {LoginFormSchema} from "../pages/LoginPage.tsx";

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export const login = async (credentials: LoginFormSchema): Promise<any> => {
    return await axiosInstance.post('/login', credentials);
};