import axiosInstance from "../../../config/axiosConfig.ts";
import {AxiosResponse} from "axios";

export type SendEmailResponse = {
    message: string;
};

export type ResetPasswordResponse = {
    message: string;
};

export class ForgotPasswordService {
    static async sendEmail(email: string): Promise<AxiosResponse<SendEmailResponse>> {
        return await axiosInstance.post<SendEmailResponse>('forgot-password/send-email', {email});
    }

    static async confirmToken(token: string): Promise<AxiosResponse<null>> {
        return await axiosInstance.post<null>('forgot-password/confirm-token', {token});
    }

    static async resetPassword(newPassword: string, newPasswordConfirmation: string, token: string): Promise<AxiosResponse<ResetPasswordResponse>> {
        const body = {
            new_password: newPassword,
            new_password_confirmation: newPasswordConfirmation,
            token
        };

        console.log('Sending body', body);

        return await axiosInstance.post<SendEmailResponse>('forgot-password/reset-password', body);
    }
}
