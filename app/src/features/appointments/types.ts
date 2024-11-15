import {Appointment} from "./models/appointment.ts";

export type ListAppointmentsReponse = {
    data: Appointment[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number;
    to: number;
};

export type AssistantResponse = {
    uuid: string;
    name: string;
    email: string;
    cpf: string;
    level: number;
    created_at: string;
    updated_at?: string;
    email_verified_at?: string;
    deleted_at?: string;
}

export type GetAssistantResponse = {
    data: AssistantResponse;
};

export type CreateAppointmentByPatient = {
    patient_uuid: string;
    type: string;
    patient_desired_date: string | null;
    patient_description: string | null;
}

export type AppointmentResponse = Appointment;

export type GetAppointmentResponse = {
    data: Appointment;
};

export type UpdateAppointmentData = {
    patient_uuid: string;
    type: string;
    canceled: boolean;
    appointment_date: string;
    doctor_uuid: string;
    canceled_reason: string | null;
}
