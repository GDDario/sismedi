import axiosInstance from "../config/axiosConfig.ts";

export class NotificationService {
    static getNotDismised = async (userUuid: string): Promise<any> => {
        const url: string = `/notification/user/${userUuid}`;
        const reponse = await axiosInstance.get(url);

        return reponse.data;
    }

    static dismissNotification = async (id: number): Promise<any> => {
        const url: string = `/notification/dismiss/${id}`;
        const reponse = await axiosInstance.post(url);

        return reponse.data;
    }

    static dismissAll = async (): Promise<any> => {
        const url: string = `/notification/dismiss`;
        const reponse = await axiosInstance.post(url);

        return reponse.data;
    }
}