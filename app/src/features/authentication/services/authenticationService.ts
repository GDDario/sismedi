import axiosInstance from "../../../config/axiosConfig.ts";

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export const logout = async (): Promise<void> => {
    return await axiosInstance.post('/logout');
}