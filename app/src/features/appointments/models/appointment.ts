export type Appointment = {
    uuid: string;
    patient_uuid: string;
    consultation_type_uuid: string;
    patient_description?: string;
    patient_desired_date?: string;
    appointment_date?: string;
    doctor_uuid?: string;
    doctor_assigned_at?: string;
    canceled?: string;
    canceled_reason?: string;
    completed_at?: string;
    created_at?: string;
    deleted_at?: string;
};