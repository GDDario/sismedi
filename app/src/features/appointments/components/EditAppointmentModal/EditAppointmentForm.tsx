import {z} from "zod";
import InputField from "../../../../shared-components/InputField.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Button from "../../../../shared-components/Button/Button.tsx";
import FormSectionHeading from "../../../../shared-components/FormSectionHeading.tsx";
import {useDispatch} from "react-redux";
import {showMessage} from "../../../../store/messageSlice.ts";
import {AppointmentResponse} from "../../types.ts";
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

const schema = z.any({});

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
        resolver: zodResolver(schema),
        defaultValues: {
            ...appointmentData
        }
    });
    const dispatch = useDispatch();
    const [medicineCategory, setMedicineCategory] = useState<string>('');
    const [consultationTypes, setConsultationTypes] = useState<SelectOptionType[]>([]);
    const [doctor, setDoctor] = useState<string>('');
    const canceled = watch("canceled");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async (): Promise<void> => {
        const response: GetAllConsultationTypesResponse = await ConsultationTypeService.getAll();

        const consultationTypes: SelectOptionType[] = response.data.map((type: ConsultationType) => {
            return {
                label: type.name,
                name: type.uuid
            };
        });

        setConsultationTypes(consultationTypes);
        setValue('type', consultationTypes[0].name)
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

    const mapDataFromSubmit = (data: EditAppointmentSchema) => {
        return {
            "patient_uuid": data.patient_uuid,
            "type": data.type,
            "patient_description": data.patient_description,
            "patient_desired_date": data.patient_desired_date,
            "canceled": data.canceled,
            "canceled_reason": data.canceled_reason,
            "doctor_uuid": data.doctor_uuid
        };
    }

    const onSubmit = async (data: EditAppointmentSchema) => {
        const newData = mapDataFromSubmit(data);

        if (newData.patient_desired_date == '' || newData.patient_desired_date === null) {
            delete newData.patient_desired_date;
        }

        await AppointmentService.update(data.uuid, newData);

        dispatch(showMessage({message: "Pedido de agendamento editado com sucesso!", type: "success"}))
        onClose();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <section className="flex flex-col gap-2">
                <FormSectionHeading text="Dados do agendamento"/>

                <div className="flex gap-4">
                    <SelectField
                        className="w-[347px]"
                        name="type"
                        label="Tipo da consulta"
                        register={register}
                        error={errors.state}
                        value={medicineCategory}
                        options={consultationTypes}
                    />

                    <InputField
                        name="patient_desired_date"
                        label="Data desejada"
                        register={register}
                        error={errors.patient_desired_date}
                        type="date"
                    />
                </div>

                <div className="flex gap-4">
                    <InputField
                        name="patient_desired_date"
                        label="Data desejada"
                        register={register}
                        error={errors.patient_desired_date}
                        type="date"
                        className="w-[230px]"
                    />

                    <SearchField
                        name="doctor_uuid"
                        label="Médico"
                        register={register}
                        error={errors.doctor}
                        onSelect={handleSelectDoctor}
                        onSearch={handleDoctorsSearch}
                        value={doctor}
                    />
                </div>

                <TextAreaField
                    label="Descrição do paciente"
                    name="patient_description"
                    register={register}
                    fullWidth
                    rows={4}
                    disabled={true}
                />

                <CheckboxField label="Cancelado" name="canceled" register={register}/>

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