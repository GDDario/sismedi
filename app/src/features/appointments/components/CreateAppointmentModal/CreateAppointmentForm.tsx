import {z} from "zod";
import InputField from "../../../../shared-components/InputField.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Button from "../../../../shared-components/Button/Button.tsx";
import FormSectionHeading from "../../../../shared-components/FormSectionHeading.tsx";
import {useDispatch, useSelector} from "react-redux";
import {showMessage} from "../../../../store/messageSlice.ts";
import {AppointmentService} from "../../services/AppointmentService.ts";
import {useEffect, useState} from "react";
import TextAreaField from "../../../../shared-components/TextAreaField.tsx";
import SelectField, {SelectOptionType} from "../../../../shared-components/SelectField/SelectField.tsx";
import {ConsultationTypeService} from "../../../consultations/services/ConsultationTypeService.ts";
import {ConsultationType} from "../../../consultations/models/consultationType.ts";
import {GetAllConsultationTypesResponse} from "../../../consultations/types.ts";
import {selectUser} from "../../../authentication/store/userSlice.ts";
import {PatientService} from "../../../patients/services/PatientService.ts";

const today = new Date().toISOString().split("T")[0];

const schema = z.object({
    type: z.string({required_error: "Campo obrigatório!"}).uuid({message: "Campo inválido!"}),
    patient_desired_date: z
        .union([
            z.string()
                .regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato yyyy-mm-dd")
                .refine((date) => date >= today, "Você não pode marcar uma consulta para o passado!"),
            z.null(),
        ]),
    patient_description: z.string().nullable()
});

type CreateAppointmentSchema = z.infer<typeof schema>;

type CreateAppointmentFormProps = {
    onClose: () => void;
};

const CreateAppointmentForm = ({onClose}: CreateAppointmentFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        reset,
        watch
    } = useForm<CreateAppointmentSchema>({
        resolver: zodResolver(schema), defaultValues: {
            patient_desired_date: null
        }
    });
    const dispatch = useDispatch();
    const [consultationTypes, setConsultationTypes] = useState<SelectOptionType[]>([]);
    const user = useSelector(selectUser);
    const desiredDate = watch('patient_desired_date');

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

    const resetPatientDesiredDate = () => {
        setValue('patient_desired_date', null);
    }

    const onSubmit = async (data: CreateAppointmentSchema) => {
        const response = await PatientService.getByUserUuid(user.uuid);

        const newData = {
            ...data,
            patient_uuid: response.data.patient.uuid
        };

        await AppointmentService.create(newData);

        dispatch(showMessage({message: "Pedido de agendamento cadastrado com sucesso!", type: "success"}))
        reset();
        onClose();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <section className="flex flex-col gap-2">
                <FormSectionHeading text="Dados do agendamento"/>

                <div className="flex gap-4 flex-wrap">
                    <SelectField
                        className="w-[347px]"
                        name="type"
                        label="Tipo da consulta"
                        register={register}
                        error={errors.type}
                        options={consultationTypes}
                        required
                    />

                    <div className="flex gap-2 items-end">
                        <InputField
                            name="patient_desired_date"
                            label="Data desejada"
                            register={register}
                            error={errors.patient_desired_date}
                            type="date"
                        />

                        <Button
                            text="Limpar data"
                            onClick={() => resetPatientDesiredDate()}
                            disabled={desiredDate === null}
                        />
                    </div>
                </div>

                <TextAreaField
                    label="Descrição"
                    name="patient_description"
                    register={register}
                    error={errors.patient_description}
                    fullWidth
                    rows={4}
                />
            </section>

            <section className="mt-2 flex gap-2">
                <Button text="Cadastrar" type="submit"/>
                <Button text="Cancelar" color="danger" type="button" onClick={onClose}/>
            </section>
        </form>
    );
};

export default CreateAppointmentForm;