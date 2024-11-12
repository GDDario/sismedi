import {z} from "zod";
import InputField from "../../../../shared-components/InputField.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Button from "../../../../shared-components/Button/Button.tsx";
import FormSectionHeading from "../../../../shared-components/FormSectionHeading.tsx";
import {useDispatch, useSelector} from "react-redux";
import {showMessage} from "../../../../store/messageSlice.ts";
import {AppointmentResponse} from "../../types.ts";
import {AppointmentService} from "../../services/AppointmentService.ts";
import TextAreaField from "../../../../shared-components/TextAreaField.tsx";
import SelectField, {SelectOptionType} from "../../../../shared-components/SelectField/SelectField.tsx";
import {PatientService} from "../../../patients/services/PatientService.ts";
import {GetAllConsultationTypesResponse} from "../../../consultations/types.ts";
import {ConsultationTypeService} from "../../../consultations/services/ConsultationTypeService.ts";
import {ConsultationType} from "../../../consultations/models/consultationType.ts";
import {useEffect, useState} from "react";
import {selectUser} from "../../../authentication/store/userSlice.ts";
import SearchField from "../../../../shared-components/SearchField/SearchField.tsx";
import {StateService} from "../../../patients/services/StateService.ts";
import {State} from "../../../patients/models/state.ts";
import CheckboxField from "../../../../shared-components/CheckboxField.tsx";

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
        setValue
    } = useForm<EditAppointmentSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            ...appointmentData
        }
    });
    const dispatch = useDispatch();
    const [medicineCategory, setMedicineCategory] = useState<string>('');
    const [consultationTypes, setConsultationTypes] = useState<SelectOptionType[]>([]);
    const [doctor, setDoctor] = useState<string>();
    const user = useSelector(selectUser);

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

    const handleStateSearch = async (text: string): Promise<any> => {
        const states = await StateService.searchByName(text);

        return states.data.map((state: State) => {
            const labelText = `${state.name} - ${state.code}`;

            return {
                uuid: state.uuid,
                label: labelText
            };
        });
    }

    const handleSelectState = (state: any) => {
        setValue('address.state_uuid', state.uuid);
        // setStateUuid(state.uuid);
    }

    const onSubmit = async (data: CreateAppointmentSchema) => {
        const response = await PatientService.getByUserUuid(user.uuid);

        const newData = {
            ...data,
            patient_uuid: response.data.patient.uuid
        };

        if (newData.patient_desired_date == '') {
            delete newData.patient_desired_date;
        }

        await AppointmentService.create(newData);

        dispatch(showMessage({message: "Pedido de agendamento cadastrado com sucesso!", type: "success"}))
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
                        onSelect={handleSelectState}
                        onSearch={handleStateSearch}
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
            </section>

            <section className="mt-2 flex gap-2">
                <Button text="Cadastrar" type="submit"/>
                <Button text="Cancelar" color="danger" type="button" onClick={onClose}/>
            </section>
        </form>
    );
};

export default EditAppointmentForm;