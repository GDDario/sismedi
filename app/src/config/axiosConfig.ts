import axios from 'axios';
import {AuthenticationService} from "../features/authentication/services/AuthenticationService.ts";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = AuthenticationService.getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        config.baseURL = import.meta.env.VITE_API_BASE_PATH;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
