import axios from 'axios';
import {getToken} from "../features/authentication/services/authenticationService.ts";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = getToken();

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
