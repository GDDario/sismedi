import {Assistant} from "./models/assistant.ts";
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
    patientUuid: string;
    type: string;
    patient_desired_date?: string;
    patient_description?: string;
}

export type AppointmentResponse = Appointment;

export type GetAppointmentResponse = {
    data: Appointment;
};

export type UpdateAppointmentData = {
    patient_uuid: string;
    type: string;
    canceled: boolean;
    patient_description?: string;
    patient_desired_date?: string;
    canceled_reason?: string;
    doctor_uuid?: string;
}
