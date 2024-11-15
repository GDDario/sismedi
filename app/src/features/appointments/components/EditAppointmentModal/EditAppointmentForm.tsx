import {z} from "zod";
import InputField from "../../../../shared-components/InputField.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Button from "../../../../shared-components/Button/Button.tsx";
import FormSectionHeading from "../../../../shared-components/FormSectionHeading.tsx";
import {useDispatch} from "react-redux";
import {showMessage} from "../../../../store/messageSlice.ts";
import {AppointmentResponse, UpdateAppointmentData} from "../../types.ts";
import {AppointmentService} from "../../services/AppointmentService.ts";
import TextAreaField from "../../../../shared-components/TextAreaField.tsx";
import SelectField, {SelectOptionType} from "../../../../shared-components/SelectField/SelectField.tsx";
import {GetAllConsultationTypesResponse} from "../../../consultations/types.ts";
import {ConsultationTypeService} from "../../../consultations/services/ConsultationTypeService.ts";
import {ConsultationType} from "../../../consultations/models/consultationType.ts";
import {useEffect, useState} from "react";
import SearchField from "../../../../shared-components/SearchField/SearchField.tsx";
import CheckboxField from "../../../../shared-components/CheckboxField.tsx";
import {DoctorService} from "../../../doctors/services/DoctorService.ts";

const schema = z.object({
    type: z.string({required_error: "Campo obrigatório!"}).uuid({message: "Campo inválido!"}),
    appointment_date: z
        .string({message: "Data do agendamento é obrigatória!"})
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato yyyy-mm-dd")
        .refine((date) => {
            const today = new Date().toISOString().split("T")[0];
            return date >= today;
        }, "Você não pode marcar uma consulta para o passado!"),
    appointment_time: z
        .string()
        .regex(/^\d{2}:\d{2}$/, "Horário deve estar no formato HH:mm")
        .refine((time) => {
            const [hours, minutes] = time.split(":").map(Number);
            const totalMinutes = hours * 60 + minutes; // Converter para minutos totais
            const minTime = 8 * 60; // 08:00 em minutos
            const maxTime = 18 * 60; // 18:00 em minutos
            return totalMinutes >= minTime && totalMinutes <= maxTime;
        }, "Horário deve estar entre 08:00 e 18:00"),
    canceled: z.boolean(),
    canceled_reason: z.string().nullable().optional(),
    doctor_uuid: z.string({message: "Campo obrigatório!"}).uuid({message: "Campo inválido!"})
}).superRefine((data, ctx) => {
    if (data.canceled && !data.canceled_reason) {
        ctx.addIssue({
            code: "custom",
            message: "Motivo do cancelamento é obrigatório quando marcado como cancelado.",
            path: ["canceled_reason"],
        });
    }
});

type EditAppointmentSchema = z.infer<typeof schema>;

type EditAppointmentFormProps = {
    onClose: () => void;
    appointmentData: AppointmentResponse;
};

const EditAppointmentForm = ({onClose, appointmentData}: EditAppointmentFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        watch
    } = useForm<EditAppointmentSchema>({
        resolver: zodResolver(schema)
    });
    const dispatch = useDispatch();
    const [consultationTypes, setConsultationTypes] = useState<SelectOptionType[]>([]);
    const [patientDesiredDate, setPatientDesiredDate] = useState<string | null>('');
    const [patientDescription, setPatientDescription] = useState<string | null>('');
    const [doctorName, setDoctorName] = useState<string | null>('');
    const canceled = watch("canceled");

    useEffect(() => {
        fetchCategories();

        loadFields();
    }, []);

    const loadFields = () => {
        if (appointmentData.appointment_date) {
            const splitedDateTime = appointmentData.appointment_date.split(' ');
            setValue('appointment_date', splitedDateTime[0]!);
            setValue('appointment_time', splitedDateTime[1].substring(0, 5));
        }

        setValue('type', appointmentData.consultation_type_uuid);
        setPatientDesiredDate(appointmentData.patient_desired_date);
        setPatientDescription(appointmentData.patient_description);
        setValue('doctor_uuid', appointmentData.doctor_uuid!);
        setDoctorName(appointmentData.doctor_name)
        setValue('canceled', appointmentData.canceled!);
        setValue('canceled_reason', appointmentData.canceled_reason)
    };

    const fetchCategories = async (): Promise<void> => {
        const response: GetAllConsultationTypesResponse = await ConsultationTypeService.getAll();

        const consultationTypes: SelectOptionType[] = response.data.map((type: ConsultationType) => {
            return {
                label: type.name,
                name: type.uuid
            };
        });

        setConsultationTypes(consultationTypes);
    }

    const handleDoctorsSearch = async (text: string): Promise<any> => {
        const response = await DoctorService.searchByName(text);

        return response.data.map((doctor: { uuid: string; name: string }) => {
            return {
                uuid: doctor.uuid,
                label: doctor.name
            };
        });
    }

    const handleSelectDoctor = (doctor: any) => {
        setValue('doctor_uuid', doctor.uuid);
    }

    const mapDataFromSubmit = (data: EditAppointmentSchema): UpdateAppointmentData => {
        // console.log('Doctor uuid', data.doctor_uuid);
        // return;
        const appointmentDate = `${data.appointment_date} ${data.appointment_time}:00`;

        const mappedData: UpdateAppointmentData = {
            "patient_uuid": appointmentData.patient_uuid,
            "type": data.type,
            "canceled": data.canceled,
            "canceled_reason": null,
            "doctor_uuid": data.doctor_uuid,
            appointment_date: appointmentDate
        };

        if (data.canceled) {
            // @ts-ignore
            mappedData['canceled_reason'] = data.canceled_reason;
        }

        return mappedData;
    }

    const onSubmit = async (data: EditAppointmentSchema) => {
        const newData = mapDataFromSubmit(data);
        console.log('Sending', newData)

        await AppointmentService.update(appointmentData.uuid, newData);

        dispatch(showMessage({message: "Pedido de agendamento editado com sucesso!", type: "success"}))
        onClose();
    }

    const onInvalid = (errors: any) => {
        console.log(errors)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-4">
            <section className="flex flex-col gap-2">
                <FormSectionHeading text="Dados do agendamento"/>

                <div className="flex gap-4">
                    <SelectField
                        className="w-[347px]"
                        name="type"
                        label="Tipo da consulta"
                        register={register}
                        error={errors.type}
                        options={consultationTypes}
                        value={watch('type')}
                        required
                    />

                    <InputField
                        name="patient_desired_date"
                        label="Data desejada pelo paciente"
                        register={register}
                        error={null}
                        value={patientDesiredDate}
                        disabled
                        type="date"
                        className="w-[205px]"
                    />
                </div>

                <div className="flex gap-4 flex-wrap">
                    <InputField
                        name="appointment_date"
                        label="Data da consulta"
                        register={register}
                        error={errors.appointment_date}
                        type="date"
                        className="w-[230px]"
                        required
                    />

                    <InputField
                        name="appointment_time"
                        label="Hora da consulta"
                        register={register}
                        error={errors.appointment_time}
                        type="time"
                        className="w-[130px]"
                        required
                    />

                    <SearchField
                        name="doctor_uuid"
                        label="Médico"
                        register={register}
                        error={errors.doctor_uuid}
                        onSelect={handleSelectDoctor}
                        onSearch={handleDoctorsSearch}
                        value={doctorName!}
                        required
                    />
                </div>

                <TextAreaField
                    label="Descrição do paciente"
                    name="patient_description"
                    register={register}
                    fullWidth
                    rows={4}
                    disabled={true}
                    value={patientDescription!}
                />

                <CheckboxField
                    label="Cancelado"
                    name="canceled"
                    register={register}
                />

                <TextAreaField
                    label="Motivo do cancelamento"
                    name="canceled_reason"
                    register={register}
                    fullWidth
                    rows={4}
                    disabled={!canceled}
                />
            </section>

            <section className="mt-2 flex gap-2">
                <Button text="Salvar" type="submit"/>
                <Button text="Cancelar" color="danger" type="button" onClick={onClose}/>
            </section>
        </form>
    );
};

export default EditAppointmentForm;