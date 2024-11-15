export type Appointment = {
    uuid: string;
    patient_uuid: string;
    consultation_type_uuid: string;
    canceled: boolean;
    patient_description: string | null;
    patient_desired_date: string | null;
    appointment_date: string | null
    doctor_uuid: string | null;
    doctor_name: string | null;
    doctor_assigned_at: string | null;
    canceled_reason: string | null;
    completed_at: string | null;
    created_at: string | null;
    deleted_at: string | null;
};